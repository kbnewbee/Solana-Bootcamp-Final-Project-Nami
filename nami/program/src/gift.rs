use solana_program::account_info::AccountInfo;
use solana_program::entrypoint::ProgramResult;
use solana_program::pubkey::Pubkey;

use crate::generated::state::{
	Account,
	AccountPDA,
	TicketMetadata,
};


/// Accounts:
/// 0. `[writable, signer]` fee_payer: [AccountInfo] Auto-generated, default fee payer
/// 1. `[]` mint_ticket: [Mint] 
/// 2. `[writable]` ticket: [TicketMetadata] 
/// 3. `[writable, signer]` funding: [AccountInfo] Funding account (must be a system account)
/// 4. `[writable]` assoc_token_account: [AccountInfo] Associated token account address to be created
/// 5. `[]` wallet: [AccountInfo] Wallet address for the new associated token account
/// 6. `[]` mint: [Mint] The token mint for the new associated token account
/// 7. `[]` system_program: [AccountInfo] System program
/// 8. `[]` token_program: [AccountInfo] SPL Token program
/// 9. `[writable]` source: [AccountInfo] The source account.
/// 10. `[writable]` destination: [AccountInfo] The destination account.
/// 11. `[signer]` authority: [AccountInfo] The source account's owner/delegate.
/// 12. `[]` csl_spl_assoc_token_v_0_0_0: [AccountInfo] Auto-generated, CslSplAssocTokenProgram v0.0.0
/// 13. `[]` csl_spl_token_v_0_0_0: [AccountInfo] Auto-generated, CslSplTokenProgram v0.0.0
pub fn gift(
	program_id: &Pubkey,
	for_create: &[&AccountInfo],
	for_transfer_checked: &[&AccountInfo],
	mint_ticket: &Account<spl_token::state::Mint>,
	ticket: &mut AccountPDA<TicketMetadata>,
	funding: &AccountInfo,
	assoc_token_account: &AccountInfo,
	wallet: &AccountInfo,
	mint: &Account<spl_token::state::Mint>,
	source: &AccountInfo,
	destination: &AccountInfo,
	authority: &AccountInfo,
) -> ProgramResult {

    if !ticket.data.is_gift {
        ticket.data.assoc_account = Some(*destination.key);
        ticket.data.is_gift = true;

        // Create the ATA account for new owner if it hasn't been created
        if assoc_token_account.lamports() == 0 {
            csl_spl_assoc_token::src::cpi::create(for_create)?;
        }
    
        csl_spl_token::src::cpi::transfer_checked(for_transfer_checked, 1, 0)?;
    }


    Ok(())
}