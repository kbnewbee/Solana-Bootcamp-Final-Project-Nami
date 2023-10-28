import {Connection, Keypair, PublicKey, sendAndConfirmTransaction, SystemProgram, Transaction,} from "@solana/web3.js";
import * as fs from "fs/promises";
import * as path from "path";
import * as os from "os";
import {
    burnSendAndConfirm,
    CslSplTokenPDAs,
    deriveTicketMetadataPDA,
    getTicketMetadata,
    initializeClient,
    mintTicketSendAndConfirm,
    giftSendAndConfirm,
    transferSendAndConfirm
} from "./index";
import {getMinimumBalanceForRentExemptAccount, getMint, TOKEN_PROGRAM_ID,} from "@solana/spl-token";

async function main(feePayer: Keypair) {
    const args = process.argv.slice(2);
    const connection = new Connection("https://api.devnet.solana.com", {
        commitment: "confirmed",
    });

    const progId = new PublicKey(args[0]!);

    initializeClient(progId, connection);


    /**
     * Create a keypair for the mint
     */
    const mintTicket = Keypair.generate();
    console.info("+==== Mint ticket Address  ====+");
    console.info(mintTicket.publicKey.toBase58());


    /**
     * Create ICC Admin wallet who will sell tickets
     */
    const iccAdminWallet = Keypair.generate();
    console.info("+==== ICC Admin Wallet ====+");
    console.info(iccAdminWallet.publicKey.toBase58());

    /**
     * Create Customer 1 wallet who will buy a normal ticket
     */
    const customerWallet1 = Keypair.generate();
    console.info("+==== Customer 1 Wallet ====+");
    console.info(customerWallet1.publicKey.toBase58());

    /**
     * Create Customer 2 wallet who will buy a VIP ticket
     */
    const customerWallet2 = Keypair.generate();
    console.info("+==== Customer 2 Wallet ====+");
    console.info(customerWallet2.publicKey.toBase58());

    /**
     * Create Customer 3 wallet who will recieve the VIP ticket as a gift
     */
    const customerWallet3 = Keypair.generate();
    console.info("+==== Customer 3 Wallet ====+");
    console.info(customerWallet3.publicKey.toBase58());

    const rent = await getMinimumBalanceForRentExemptAccount(connection);
    await sendAndConfirmTransaction(
        connection,
        new Transaction()
            .add(
                SystemProgram.createAccount({
                    fromPubkey: feePayer.publicKey,
                    newAccountPubkey: iccAdminWallet.publicKey,
                    space: 0,
                    lamports: rent,
                    programId: SystemProgram.programId,
                }),
            )
            .add(
                SystemProgram.createAccount({
                    fromPubkey: feePayer.publicKey,
                    newAccountPubkey: customerWallet1.publicKey,
                    space: 0,
                    lamports: rent,
                    programId: SystemProgram.programId,
                }),
            )
            .add(
                SystemProgram.createAccount({
                    fromPubkey: feePayer.publicKey,
                    newAccountPubkey: customerWallet2.publicKey,
                    space: 0,
                    lamports: rent,
                    programId: SystemProgram.programId,
                }),
            )
            .add(
                SystemProgram.createAccount({
                    fromPubkey: feePayer.publicKey,
                    newAccountPubkey: customerWallet3.publicKey,
                    space: 0,
                    lamports: rent,
                    programId: SystemProgram.programId,
                }),
            ),
        [feePayer, iccAdminWallet, customerWallet1, customerWallet2, customerWallet3],
    );

    /**
     * Derive the Ticket Metadata so we can retrieve it later
     */
    const [ticketPub] = deriveTicketMetadataPDA(
        {
            mintTicket: mintTicket.publicKey,
        },
        progId,
    );



    console.info("+==== Ticket Metadata Address ====+");
    console.info(ticketPub.toBase58());

    /**
     * Derive the ICC Admin's Associated Token Account (ATA), this account will be
     * holding the minted ticket NFT.
     */
    const [iccAdminATA] = CslSplTokenPDAs.deriveAccountPDA({
        wallet: iccAdminWallet.publicKey,
        mint: mintTicket.publicKey,
        tokenProgram: TOKEN_PROGRAM_ID,
    });
    console.info("+==== ICC Admin ATA ====+");
    console.info(iccAdminATA.toBase58());

    /**
     * Derive the Customer1's Associated Token Account (ATA), this account will be
     * holding the minted NFT when the ICC Admin transfers it and sells the NFT
     */
    const [customer1ATA] = CslSplTokenPDAs.deriveAccountPDA({
        wallet: customerWallet1.publicKey,
        mint: mintTicket.publicKey,
        tokenProgram: TOKEN_PROGRAM_ID,
    });
    console.info("+==== Customer 1 ATA ====+");
    console.info(customer1ATA.toBase58());

    /**
     * Derive the Customer2's Associated Token Account (ATA), this account will be
     * holding the minted NFT when the ICC Admin transfers it and sells the NFT
     */
     const [customer2ATA] = CslSplTokenPDAs.deriveAccountPDA({
        wallet: customerWallet2.publicKey,
        mint: mintTicket.publicKey,
        tokenProgram: TOKEN_PROGRAM_ID,
    });
    console.info("+==== Customer 2 ATA ====+");
    console.info(customer2ATA.toBase58());

    /**
     * Derive the Customer3's Associated Token Account (ATA), this account will be
     * holding the minted NFT when the Customer 2 transfers it and gifts the NFT
     */
     const [customer3ATA] = CslSplTokenPDAs.deriveAccountPDA({
        wallet: customerWallet3.publicKey,
        mint: mintTicket.publicKey,
        tokenProgram: TOKEN_PROGRAM_ID,
    });
    console.info("+==== Customer 3 ATA ====+");
    console.info(customer3ATA.toBase58());

    /**
     * Mint a new ticket NFT into ICC Admin's wallet (technically, the Associated Token Account)
     */
    console.info("+==== Minting ticket into ICC Admin's account... ====+");
    await mintTicketSendAndConfirm({
        wallet: iccAdminWallet.publicKey,
        assocTokenAccount: iccAdminATA,
        name: "ICC World Cup 2023",
        game: "IND vs AUS",
        location: "HPCA, Dharamshala",
        seat: "Middle Row - 7",
        date: "28 October, 2023",
        price: 1500.00,
        class: "Normal",
        available: 10,
        isOwned: false,
        isGift: false,
        isUsed: false,
        signers: {
            feePayer: feePayer,
            funding: feePayer,
            mintTicket: mintTicket,
            owner: iccAdminWallet,
        },
        mint: mintTicket.publicKey,
    });
    console.info("+==== Minted Normal ticket ====+");

    /**
     * Get the minted token
     */
    let mintTicketAccount = await getMint(connection, mintTicket.publicKey);
    console.info("+==== mintTicketAccount ====+");
    console.info(mintTicketAccount);


    /**
     * Get the ticket Metadata
     */
    let ticket = await getTicketMetadata(ticketPub);
    console.info("+==== Ticket Metadata ====+");
    console.info(ticket);
    console.assert(ticket!.assocAccount!.toBase58(), iccAdminATA.toBase58());

    /**
     * Sell Ticket to Customer 1 - transfer ICC Admin's ticket NFT to Customer 1 wallet or ATA
     */
    console.info("+==== Transferring and SELLING... ====+");
    await transferSendAndConfirm({
        wallet: customerWallet1.publicKey,
        assocTokenAccount: customer1ATA,
        mint: mintTicket.publicKey,
        source: iccAdminATA,
        destination: customer1ATA,
        signers: {
            feePayer: feePayer,
            funding: feePayer,
            authority: iccAdminWallet,
        },
        mintTicket: mintTicket.publicKey,
    });
    console.info("+==== Transferred and SOLD ====+");

    /**
     * Get the minted token
     */
    mintTicketAccount = await getMint(connection, mintTicket.publicKey);
    console.info("+==== Mint ticket account (should be changed from last time) ====+");
    console.info(mintTicketAccount);

    /**
     * Get the Ticket Metadata
     */
    ticket = await getTicketMetadata(ticketPub);
    console.info("+==== Ticket Metadata ====+");
    console.info(ticket);
    console.assert(ticket!.assocAccount!.toBase58(), customer1ATA.toBase58());

    /**
     * Burn the NFT
     */
    console.info("+==== Burning... ====+");
    await burnSendAndConfirm({
        mint: mintTicket.publicKey,
        wallet: customerWallet1.publicKey,
        signers: {
            feePayer: feePayer,
            owner: customerWallet1,
        },
        mintTicket: mintTicket.publicKey,
    });
    console.info("+==== Burned ====+");

    /**
     * Get the minted token
     */
    mintTicketAccount = await getMint(connection, mintTicket.publicKey);
    console.info("+==== Mint ticket account ====+");
    console.info(mintTicketAccount);

    /**
     * Get the Ticket Metadata
     */
    ticket = await getTicketMetadata(ticketPub);
    console.info("+==== Ticket Metadata ====+");
    console.info(ticket);
    console.assert(ticket!.assocAccount!.toBase58(), customer1ATA.toBase58());
}

fs.readFile(path.join(os.homedir(), ".config/solana/id.json")).then((file) =>
    main(Keypair.fromSecretKey(new Uint8Array(JSON.parse(file.toString())))),
);
