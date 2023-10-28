// This file is auto-generated from the CIDL source.
// Editing this file directly is not recommended as it may be overwritten.

import * as pda from "./pda";
import * as T from "./types";
import {
    Commitment,
    Connection,
    GetAccountInfoConfig,
    Keypair,
    PublicKey,
    sendAndConfirmTransaction,
    SystemProgram,
    Transaction,
    TransactionInstruction,
    TransactionSignature,
} from "@solana/web3.js";
import {deserialize, serialize} from "borsh";


let _programId: PublicKey;
let _connection: Connection;

export const initializeClient = (
    programId: PublicKey,
    connection: Connection
) => {
    _programId = programId;
    _connection = connection;
};

export enum TicketInstruction {
/**
 * Accounts:
 * 0. `[writable, signer]` fee_payer: {@link PublicKey} Auto-generated, default fee payer
 * 1. `[writable, signer]` mint_ticket: {@link Mint} 
 * 2. `[writable]` ticket: {@link TicketMetadata} 
 * 3. `[]` system_program: {@link PublicKey} Auto-generated, for account initialization
 * 4. `[writable]` mint: {@link Mint} 
 * 5. `[writable, signer]` funding: {@link PublicKey} Funding account (must be a system account)
 * 6. `[writable]` assoc_token_account: {@link PublicKey} Associated token account address to be created
 * 7. `[]` wallet: {@link PublicKey} Wallet address for the new associated token account
 * 8. `[]` token_program: {@link PublicKey} SPL Token program
 * 9. `[signer]` owner: {@link PublicKey} The mint's minting authority.
 * 10. `[]` csl_spl_token_v_0_0_0: {@link PublicKey} Auto-generated, CslSplTokenProgram v0.0.0
 * 11. `[]` csl_spl_assoc_token_v_0_0_0: {@link PublicKey} Auto-generated, CslSplAssocTokenProgram v0.0.0
 *
 * Data:
 * - name: {@link string} 
 * - game: {@link string} 
 * - location: {@link string} 
 * - seat: {@link string} 
 * - price: {@link number} 
 * - date: {@link string} 
 * - class: {@link string} 
 * - available: {@link number} 
 * - is_owned: {@link boolean} 
 * - is_gift: {@link boolean} 
 * - is_used: {@link boolean} 
 */
    MintTicket = 0,

/**
 * Accounts:
 * 0. `[writable, signer]` fee_payer: {@link PublicKey} Auto-generated, default fee payer
 * 1. `[]` mint_ticket: {@link Mint} 
 * 2. `[writable]` ticket: {@link TicketMetadata} 
 * 3. `[writable, signer]` funding: {@link PublicKey} Funding account (must be a system account)
 * 4. `[writable]` assoc_token_account: {@link PublicKey} Associated token account address to be created
 * 5. `[]` wallet: {@link PublicKey} Wallet address for the new associated token account
 * 6. `[]` mint: {@link Mint} The token mint for the new associated token account
 * 7. `[]` system_program: {@link PublicKey} System program
 * 8. `[]` token_program: {@link PublicKey} SPL Token program
 * 9. `[writable]` source: {@link PublicKey} The source account.
 * 10. `[writable]` destination: {@link PublicKey} The destination account.
 * 11. `[signer]` authority: {@link PublicKey} The source account's owner/delegate.
 * 12. `[]` csl_spl_assoc_token_v_0_0_0: {@link PublicKey} Auto-generated, CslSplAssocTokenProgram v0.0.0
 * 13. `[]` csl_spl_token_v_0_0_0: {@link PublicKey} Auto-generated, CslSplTokenProgram v0.0.0
 */
    Gift = 1,

/**
 * Accounts:
 * 0. `[writable, signer]` fee_payer: {@link PublicKey} Auto-generated, default fee payer
 * 1. `[]` mint_ticket: {@link Mint} 
 * 2. `[writable]` ticket: {@link TicketMetadata} 
 * 3. `[writable, signer]` funding: {@link PublicKey} Funding account (must be a system account)
 * 4. `[writable]` assoc_token_account: {@link PublicKey} Associated token account address to be created
 * 5. `[]` wallet: {@link PublicKey} Wallet address for the new associated token account
 * 6. `[]` mint: {@link Mint} The token mint for the new associated token account
 * 7. `[]` system_program: {@link PublicKey} System program
 * 8. `[]` token_program: {@link PublicKey} SPL Token program
 * 9. `[writable]` source: {@link PublicKey} The source account.
 * 10. `[writable]` destination: {@link PublicKey} The destination account.
 * 11. `[signer]` authority: {@link PublicKey} The source account's owner/delegate.
 * 12. `[]` csl_spl_assoc_token_v_0_0_0: {@link PublicKey} Auto-generated, CslSplAssocTokenProgram v0.0.0
 * 13. `[]` csl_spl_token_v_0_0_0: {@link PublicKey} Auto-generated, CslSplTokenProgram v0.0.0
 */
    Transfer = 2,

/**
 * Accounts:
 * 0. `[writable, signer]` fee_payer: {@link PublicKey} Auto-generated, default fee payer
 * 1. `[]` mint_ticket: {@link Mint} 
 * 2. `[writable]` ticket: {@link TicketMetadata} 
 * 3. `[writable]` account: {@link Account} The account to burn from.
 * 4. `[writable]` mint: {@link Mint} The token mint.
 * 5. `[signer]` owner: {@link PublicKey} The account's owner/delegate.
 * 6. `[]` wallet: {@link PublicKey} Wallet address for the new associated token account
 * 7. `[]` token_program: {@link PublicKey} SPL Token program
 * 8. `[]` csl_spl_token_v_0_0_0: {@link PublicKey} Auto-generated, CslSplTokenProgram v0.0.0
 */
    Burn = 3,
}

export type MintTicketArgs = {
    feePayer: PublicKey;
    mintTicket: PublicKey;
    mint: PublicKey;
    funding: PublicKey;
    assocTokenAccount: PublicKey;
    wallet: PublicKey;
    owner: PublicKey;
    name: string;
    game: string;
    location: string;
    seat: string;
    price: number;
    date: string;
    class: string;
    available: number;
    isOwned: boolean;
    isGift: boolean;
    isUsed: boolean;
};


/**
 * ### Returns a {@link TransactionInstruction}
 * Accounts:
 * 0. `[writable, signer]` fee_payer: {@link PublicKey} Auto-generated, default fee payer
 * 1. `[writable, signer]` mint_ticket: {@link Mint} 
 * 2. `[writable]` ticket: {@link TicketMetadata} 
 * 3. `[]` system_program: {@link PublicKey} Auto-generated, for account initialization
 * 4. `[writable]` mint: {@link Mint} 
 * 5. `[writable, signer]` funding: {@link PublicKey} Funding account (must be a system account)
 * 6. `[writable]` assoc_token_account: {@link PublicKey} Associated token account address to be created
 * 7. `[]` wallet: {@link PublicKey} Wallet address for the new associated token account
 * 8. `[]` token_program: {@link PublicKey} SPL Token program
 * 9. `[signer]` owner: {@link PublicKey} The mint's minting authority.
 * 10. `[]` csl_spl_token_v_0_0_0: {@link PublicKey} Auto-generated, CslSplTokenProgram v0.0.0
 * 11. `[]` csl_spl_assoc_token_v_0_0_0: {@link PublicKey} Auto-generated, CslSplAssocTokenProgram v0.0.0
 *
 * Data:
 * - name: {@link string} 
 * - game: {@link string} 
 * - location: {@link string} 
 * - seat: {@link string} 
 * - price: {@link number} 
 * - date: {@link string} 
 * - class: {@link string} 
 * - available: {@link number} 
 * - is_owned: {@link boolean} 
 * - is_gift: {@link boolean} 
 * - is_used: {@link boolean} 
 */
export const mintTicket = (args: MintTicketArgs): TransactionInstruction => {
    const data = serialize(
        {
            struct: {
                id: "u8",
                name: "string",
                game: "string",
                location: "string",
                seat: "string",
                price: "f32",
                date: "string",
                class: "string",
                available: "u32",
                is_owned: "bool",
                is_gift: "bool",
                is_used: "bool",
            },
        },
        {
            id: TicketInstruction.MintTicket,
            name: args.name,
            game: args.game,
            location: args.location,
            seat: args.seat,
            price: args.price,
            date: args.date,
            class: args.class,
            available: args.available,
            is_owned: args.isOwned,
            is_gift: args.isGift,
            is_used: args.isUsed,
        }
    );

    const [ticketPubkey] = pda.deriveTicketMetadataPDA({
        mintTicket: args.mintTicket,
    }, _programId);

    return new TransactionInstruction({
        data: Buffer.from(data),
        keys: [
            {pubkey: args.feePayer, isSigner: true, isWritable: true},
            {pubkey: args.mintTicket, isSigner: true, isWritable: true},
            {pubkey: ticketPubkey, isSigner: false, isWritable: true},
            {pubkey: new PublicKey("11111111111111111111111111111111"), isSigner: false, isWritable: false},
            {pubkey: args.mint, isSigner: false, isWritable: true},
            {pubkey: args.funding, isSigner: true, isWritable: true},
            {pubkey: args.assocTokenAccount, isSigner: false, isWritable: true},
            {pubkey: args.wallet, isSigner: false, isWritable: false},
            {pubkey: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"), isSigner: false, isWritable: false},
            {pubkey: args.owner, isSigner: true, isWritable: false},
            {pubkey: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"), isSigner: false, isWritable: false},
            {pubkey: new PublicKey("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"), isSigner: false, isWritable: false},
        ],
        programId: _programId,
    });
};

/**
 * ### Returns a {@link TransactionSignature}
 * Accounts:
 * 0. `[writable, signer]` fee_payer: {@link PublicKey} Auto-generated, default fee payer
 * 1. `[writable, signer]` mint_ticket: {@link Mint} 
 * 2. `[writable]` ticket: {@link TicketMetadata} 
 * 3. `[]` system_program: {@link PublicKey} Auto-generated, for account initialization
 * 4. `[writable]` mint: {@link Mint} 
 * 5. `[writable, signer]` funding: {@link PublicKey} Funding account (must be a system account)
 * 6. `[writable]` assoc_token_account: {@link PublicKey} Associated token account address to be created
 * 7. `[]` wallet: {@link PublicKey} Wallet address for the new associated token account
 * 8. `[]` token_program: {@link PublicKey} SPL Token program
 * 9. `[signer]` owner: {@link PublicKey} The mint's minting authority.
 * 10. `[]` csl_spl_token_v_0_0_0: {@link PublicKey} Auto-generated, CslSplTokenProgram v0.0.0
 * 11. `[]` csl_spl_assoc_token_v_0_0_0: {@link PublicKey} Auto-generated, CslSplAssocTokenProgram v0.0.0
 *
 * Data:
 * - name: {@link string} 
 * - game: {@link string} 
 * - location: {@link string} 
 * - seat: {@link string} 
 * - price: {@link number} 
 * - date: {@link string} 
 * - class: {@link string} 
 * - available: {@link number} 
 * - is_owned: {@link boolean} 
 * - is_gift: {@link boolean} 
 * - is_used: {@link boolean} 
 */
export const mintTicketSendAndConfirm = async (
    args: Omit<MintTicketArgs, "feePayer" |"mintTicket" |"funding" |"owner"> & { 
        signers: { feePayer: Keypair,  mintTicket: Keypair,  funding: Keypair,  owner: Keypair, }
 }
): Promise<TransactionSignature> => {
    const trx = new Transaction();


    trx.add(mintTicket({
        ...args,
        feePayer: args.signers.feePayer.publicKey,
        mintTicket: args.signers.mintTicket.publicKey,
        funding: args.signers.funding.publicKey,
        owner: args.signers.owner.publicKey,
    }));

    return await sendAndConfirmTransaction(
        _connection,
        trx,
        [args.signers.feePayer, args.signers.mintTicket, args.signers.funding, args.signers.owner, ]
    );
};

export type GiftArgs = {
    feePayer: PublicKey;
    mintTicket: PublicKey;
    funding: PublicKey;
    assocTokenAccount: PublicKey;
    wallet: PublicKey;
    mint: PublicKey;
    source: PublicKey;
    destination: PublicKey;
    authority: PublicKey;
};


/**
 * ### Returns a {@link TransactionInstruction}
 * Accounts:
 * 0. `[writable, signer]` fee_payer: {@link PublicKey} Auto-generated, default fee payer
 * 1. `[]` mint_ticket: {@link Mint} 
 * 2. `[writable]` ticket: {@link TicketMetadata} 
 * 3. `[writable, signer]` funding: {@link PublicKey} Funding account (must be a system account)
 * 4. `[writable]` assoc_token_account: {@link PublicKey} Associated token account address to be created
 * 5. `[]` wallet: {@link PublicKey} Wallet address for the new associated token account
 * 6. `[]` mint: {@link Mint} The token mint for the new associated token account
 * 7. `[]` system_program: {@link PublicKey} System program
 * 8. `[]` token_program: {@link PublicKey} SPL Token program
 * 9. `[writable]` source: {@link PublicKey} The source account.
 * 10. `[writable]` destination: {@link PublicKey} The destination account.
 * 11. `[signer]` authority: {@link PublicKey} The source account's owner/delegate.
 * 12. `[]` csl_spl_assoc_token_v_0_0_0: {@link PublicKey} Auto-generated, CslSplAssocTokenProgram v0.0.0
 * 13. `[]` csl_spl_token_v_0_0_0: {@link PublicKey} Auto-generated, CslSplTokenProgram v0.0.0
 */
export const gift = (args: GiftArgs): TransactionInstruction => {
    const data = serialize(
        {
            struct: {
                id: "u8",
            },
        },
        {
            id: TicketInstruction.Gift,
        }
    );

    const [ticketPubkey] = pda.deriveTicketMetadataPDA({
        mintTicket: args.mintTicket,
    }, _programId);

    return new TransactionInstruction({
        data: Buffer.from(data),
        keys: [
            {pubkey: args.feePayer, isSigner: true, isWritable: true},
            {pubkey: args.mintTicket, isSigner: false, isWritable: false},
            {pubkey: ticketPubkey, isSigner: false, isWritable: true},
            {pubkey: args.funding, isSigner: true, isWritable: true},
            {pubkey: args.assocTokenAccount, isSigner: false, isWritable: true},
            {pubkey: args.wallet, isSigner: false, isWritable: false},
            {pubkey: args.mint, isSigner: false, isWritable: false},
            {pubkey: new PublicKey("11111111111111111111111111111111"), isSigner: false, isWritable: false},
            {pubkey: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"), isSigner: false, isWritable: false},
            {pubkey: args.source, isSigner: false, isWritable: true},
            {pubkey: args.destination, isSigner: false, isWritable: true},
            {pubkey: args.authority, isSigner: true, isWritable: false},
            {pubkey: new PublicKey("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"), isSigner: false, isWritable: false},
            {pubkey: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"), isSigner: false, isWritable: false},
        ],
        programId: _programId,
    });
};

/**
 * ### Returns a {@link TransactionSignature}
 * Accounts:
 * 0. `[writable, signer]` fee_payer: {@link PublicKey} Auto-generated, default fee payer
 * 1. `[]` mint_ticket: {@link Mint} 
 * 2. `[writable]` ticket: {@link TicketMetadata} 
 * 3. `[writable, signer]` funding: {@link PublicKey} Funding account (must be a system account)
 * 4. `[writable]` assoc_token_account: {@link PublicKey} Associated token account address to be created
 * 5. `[]` wallet: {@link PublicKey} Wallet address for the new associated token account
 * 6. `[]` mint: {@link Mint} The token mint for the new associated token account
 * 7. `[]` system_program: {@link PublicKey} System program
 * 8. `[]` token_program: {@link PublicKey} SPL Token program
 * 9. `[writable]` source: {@link PublicKey} The source account.
 * 10. `[writable]` destination: {@link PublicKey} The destination account.
 * 11. `[signer]` authority: {@link PublicKey} The source account's owner/delegate.
 * 12. `[]` csl_spl_assoc_token_v_0_0_0: {@link PublicKey} Auto-generated, CslSplAssocTokenProgram v0.0.0
 * 13. `[]` csl_spl_token_v_0_0_0: {@link PublicKey} Auto-generated, CslSplTokenProgram v0.0.0
 */
export const giftSendAndConfirm = async (
    args: Omit<GiftArgs, "feePayer" |"funding" |"authority"> & { 
        signers: { feePayer: Keypair,  funding: Keypair,  authority: Keypair, }
 }
): Promise<TransactionSignature> => {
    const trx = new Transaction();


    trx.add(gift({
        ...args,
        feePayer: args.signers.feePayer.publicKey,
        funding: args.signers.funding.publicKey,
        authority: args.signers.authority.publicKey,
    }));

    return await sendAndConfirmTransaction(
        _connection,
        trx,
        [args.signers.feePayer, args.signers.funding, args.signers.authority, ]
    );
};

export type TransferArgs = {
    feePayer: PublicKey;
    mintTicket: PublicKey;
    funding: PublicKey;
    assocTokenAccount: PublicKey;
    wallet: PublicKey;
    mint: PublicKey;
    source: PublicKey;
    destination: PublicKey;
    authority: PublicKey;
};


/**
 * ### Returns a {@link TransactionInstruction}
 * Accounts:
 * 0. `[writable, signer]` fee_payer: {@link PublicKey} Auto-generated, default fee payer
 * 1. `[]` mint_ticket: {@link Mint} 
 * 2. `[writable]` ticket: {@link TicketMetadata} 
 * 3. `[writable, signer]` funding: {@link PublicKey} Funding account (must be a system account)
 * 4. `[writable]` assoc_token_account: {@link PublicKey} Associated token account address to be created
 * 5. `[]` wallet: {@link PublicKey} Wallet address for the new associated token account
 * 6. `[]` mint: {@link Mint} The token mint for the new associated token account
 * 7. `[]` system_program: {@link PublicKey} System program
 * 8. `[]` token_program: {@link PublicKey} SPL Token program
 * 9. `[writable]` source: {@link PublicKey} The source account.
 * 10. `[writable]` destination: {@link PublicKey} The destination account.
 * 11. `[signer]` authority: {@link PublicKey} The source account's owner/delegate.
 * 12. `[]` csl_spl_assoc_token_v_0_0_0: {@link PublicKey} Auto-generated, CslSplAssocTokenProgram v0.0.0
 * 13. `[]` csl_spl_token_v_0_0_0: {@link PublicKey} Auto-generated, CslSplTokenProgram v0.0.0
 */
export const transfer = (args: TransferArgs): TransactionInstruction => {
    const data = serialize(
        {
            struct: {
                id: "u8",
            },
        },
        {
            id: TicketInstruction.Transfer,
        }
    );

    const [ticketPubkey] = pda.deriveTicketMetadataPDA({
        mintTicket: args.mintTicket,
    }, _programId);

    return new TransactionInstruction({
        data: Buffer.from(data),
        keys: [
            {pubkey: args.feePayer, isSigner: true, isWritable: true},
            {pubkey: args.mintTicket, isSigner: false, isWritable: false},
            {pubkey: ticketPubkey, isSigner: false, isWritable: true},
            {pubkey: args.funding, isSigner: true, isWritable: true},
            {pubkey: args.assocTokenAccount, isSigner: false, isWritable: true},
            {pubkey: args.wallet, isSigner: false, isWritable: false},
            {pubkey: args.mint, isSigner: false, isWritable: false},
            {pubkey: new PublicKey("11111111111111111111111111111111"), isSigner: false, isWritable: false},
            {pubkey: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"), isSigner: false, isWritable: false},
            {pubkey: args.source, isSigner: false, isWritable: true},
            {pubkey: args.destination, isSigner: false, isWritable: true},
            {pubkey: args.authority, isSigner: true, isWritable: false},
            {pubkey: new PublicKey("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"), isSigner: false, isWritable: false},
            {pubkey: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"), isSigner: false, isWritable: false},
        ],
        programId: _programId,
    });
};

/**
 * ### Returns a {@link TransactionSignature}
 * Accounts:
 * 0. `[writable, signer]` fee_payer: {@link PublicKey} Auto-generated, default fee payer
 * 1. `[]` mint_ticket: {@link Mint} 
 * 2. `[writable]` ticket: {@link TicketMetadata} 
 * 3. `[writable, signer]` funding: {@link PublicKey} Funding account (must be a system account)
 * 4. `[writable]` assoc_token_account: {@link PublicKey} Associated token account address to be created
 * 5. `[]` wallet: {@link PublicKey} Wallet address for the new associated token account
 * 6. `[]` mint: {@link Mint} The token mint for the new associated token account
 * 7. `[]` system_program: {@link PublicKey} System program
 * 8. `[]` token_program: {@link PublicKey} SPL Token program
 * 9. `[writable]` source: {@link PublicKey} The source account.
 * 10. `[writable]` destination: {@link PublicKey} The destination account.
 * 11. `[signer]` authority: {@link PublicKey} The source account's owner/delegate.
 * 12. `[]` csl_spl_assoc_token_v_0_0_0: {@link PublicKey} Auto-generated, CslSplAssocTokenProgram v0.0.0
 * 13. `[]` csl_spl_token_v_0_0_0: {@link PublicKey} Auto-generated, CslSplTokenProgram v0.0.0
 */
export const transferSendAndConfirm = async (
    args: Omit<TransferArgs, "feePayer" |"funding" |"authority"> & { 
        signers: { feePayer: Keypair,  funding: Keypair,  authority: Keypair, }
 }
): Promise<TransactionSignature> => {
    const trx = new Transaction();


    trx.add(transfer({
        ...args,
        feePayer: args.signers.feePayer.publicKey,
        funding: args.signers.funding.publicKey,
        authority: args.signers.authority.publicKey,
    }));

    return await sendAndConfirmTransaction(
        _connection,
        trx,
        [args.signers.feePayer, args.signers.funding, args.signers.authority, ]
    );
};

export type BurnArgs = {
    feePayer: PublicKey;
    mintTicket: PublicKey;
    mint: PublicKey;
    owner: PublicKey;
    wallet: PublicKey;
};


/**
 * ### Returns a {@link TransactionInstruction}
 * Accounts:
 * 0. `[writable, signer]` fee_payer: {@link PublicKey} Auto-generated, default fee payer
 * 1. `[]` mint_ticket: {@link Mint} 
 * 2. `[writable]` ticket: {@link TicketMetadata} 
 * 3. `[writable]` account: {@link Account} The account to burn from.
 * 4. `[writable]` mint: {@link Mint} The token mint.
 * 5. `[signer]` owner: {@link PublicKey} The account's owner/delegate.
 * 6. `[]` wallet: {@link PublicKey} Wallet address for the new associated token account
 * 7. `[]` token_program: {@link PublicKey} SPL Token program
 * 8. `[]` csl_spl_token_v_0_0_0: {@link PublicKey} Auto-generated, CslSplTokenProgram v0.0.0
 */
export const burn = (args: BurnArgs): TransactionInstruction => {
    const data = serialize(
        {
            struct: {
                id: "u8",
            },
        },
        {
            id: TicketInstruction.Burn,
        }
    );

    const [ticketPubkey] = pda.deriveTicketMetadataPDA({
        mintTicket: args.mintTicket,
    }, _programId);
    const [accountPubkey] = pda.CslSplTokenPDAs.deriveAccountPDA({
        wallet: args.wallet,
        tokenProgram: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"),
        mint: args.mint,
    }, );

    return new TransactionInstruction({
        data: Buffer.from(data),
        keys: [
            {pubkey: args.feePayer, isSigner: true, isWritable: true},
            {pubkey: args.mintTicket, isSigner: false, isWritable: false},
            {pubkey: ticketPubkey, isSigner: false, isWritable: true},
            {pubkey: accountPubkey, isSigner: false, isWritable: true},
            {pubkey: args.mint, isSigner: false, isWritable: true},
            {pubkey: args.owner, isSigner: true, isWritable: false},
            {pubkey: args.wallet, isSigner: false, isWritable: false},
            {pubkey: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"), isSigner: false, isWritable: false},
            {pubkey: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"), isSigner: false, isWritable: false},
        ],
        programId: _programId,
    });
};

/**
 * ### Returns a {@link TransactionSignature}
 * Accounts:
 * 0. `[writable, signer]` fee_payer: {@link PublicKey} Auto-generated, default fee payer
 * 1. `[]` mint_ticket: {@link Mint} 
 * 2. `[writable]` ticket: {@link TicketMetadata} 
 * 3. `[writable]` account: {@link Account} The account to burn from.
 * 4. `[writable]` mint: {@link Mint} The token mint.
 * 5. `[signer]` owner: {@link PublicKey} The account's owner/delegate.
 * 6. `[]` wallet: {@link PublicKey} Wallet address for the new associated token account
 * 7. `[]` token_program: {@link PublicKey} SPL Token program
 * 8. `[]` csl_spl_token_v_0_0_0: {@link PublicKey} Auto-generated, CslSplTokenProgram v0.0.0
 */
export const burnSendAndConfirm = async (
    args: Omit<BurnArgs, "feePayer" |"owner"> & { 
        signers: { feePayer: Keypair,  owner: Keypair, }
 }
): Promise<TransactionSignature> => {
    const trx = new Transaction();


    trx.add(burn({
        ...args,
        feePayer: args.signers.feePayer.publicKey,
        owner: args.signers.owner.publicKey,
    }));

    return await sendAndConfirmTransaction(
        _connection,
        trx,
        [args.signers.feePayer, args.signers.owner, ]
    );
};

// Getters

export const getTicketMetadata = async (
    publicKey: PublicKey,
    commitmentOrConfig: Commitment | GetAccountInfoConfig | undefined = "processed"
): Promise<T.TicketMetadata | undefined> => {
    const buffer = await _connection.getAccountInfo(publicKey, commitmentOrConfig);

    if (!buffer) {
        return undefined
    }

    if (buffer.data.length <= 0) {
        return undefined
    }

    return T.decodeTicketMetadata(deserialize(T.TicketMetadataSchema, buffer.data) as Record<string, unknown>);
}
export module CslSplTokenGetters {
    export const getMint = async (
        publicKey: PublicKey,
        commitmentOrConfig: Commitment | GetAccountInfoConfig | undefined = "processed"
    ): Promise<T.CslSplTokenTypes.Mint | undefined> => {
        const buffer = await _connection.getAccountInfo(publicKey, commitmentOrConfig);
    
        if (!buffer) {
            return undefined
        }
    
        if (buffer.data.length <= 0) {
            return undefined
        }
    
        return T.CslSplTokenTypes.decodeMint(deserialize(T.CslSplTokenTypes.MintSchema, buffer.data) as Record<string, unknown>);
    }
    
    export const getAccount = async (
        publicKey: PublicKey,
        commitmentOrConfig: Commitment | GetAccountInfoConfig | undefined = "processed"
    ): Promise<T.CslSplTokenTypes.Account | undefined> => {
        const buffer = await _connection.getAccountInfo(publicKey, commitmentOrConfig);
    
        if (!buffer) {
            return undefined
        }
    
        if (buffer.data.length <= 0) {
            return undefined
        }
    
        return T.CslSplTokenTypes.decodeAccount(deserialize(T.CslSplTokenTypes.AccountSchema, buffer.data) as Record<string, unknown>);
    }
}



// Websocket Events

