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
/// 3. `[writable]` account: [Account] The account to burn from.
/// 4. `[writable]` mint: [Mint] The token mint.
/// 5. `[signer]` owner: [AccountInfo] The account's owner/delegate.
/// 6. `[]` wallet: [AccountInfo] Wallet address for the new associated token account
/// 7. `[]` token_program: [AccountInfo] SPL Token program
/// 8. `[]` csl_spl_token_v_0_0_0: [AccountInfo] Auto-generated, CslSplTokenProgram v0.0.0
pub fn burn(
	program_id: &Pubkey,
	for_burn: &[&AccountInfo],
	mint_ticket: &Account<spl_token::state::Mint>,
	ticket: &mut AccountPDA<TicketMetadata>,
	account: &AccountPDA<spl_token::state::Account>,
	mint: &Account<spl_token::state::Mint>,
	owner: &AccountInfo,
	wallet: &AccountInfo,
) -> ProgramResult {
     
    ticket.data.is_used = true;
    csl_spl_token::src::cpi::burn(for_burn, 1)?; 

    Ok(())
}