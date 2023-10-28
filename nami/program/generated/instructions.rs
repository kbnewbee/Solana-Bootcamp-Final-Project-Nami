// This file is auto-generated from the CIDL source.
// Editing this file directly is not recommended as it may be overwritten.

use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::program_error::ProgramError;
use solana_program::pubkey::Pubkey;
use crate::generated::errors::TicketError;

#[derive(BorshSerialize, Debug)]
pub enum TicketInstruction {
/// Accounts:
/// 0. `[writable, signer]` fee_payer: [AccountInfo] Auto-generated, default fee payer
/// 1. `[writable, signer]` mint_ticket: [Mint] 
/// 2. `[writable]` ticket: [TicketMetadata] 
/// 3. `[]` system_program: [AccountInfo] Auto-generated, for account initialization
/// 4. `[writable]` mint: [Mint] 
/// 5. `[writable, signer]` funding: [AccountInfo] Funding account (must be a system account)
/// 6. `[writable]` assoc_token_account: [AccountInfo] Associated token account address to be created
/// 7. `[]` wallet: [AccountInfo] Wallet address for the new associated token account
/// 8. `[]` token_program: [AccountInfo] SPL Token program
/// 9. `[signer]` owner: [AccountInfo] The mint's minting authority.
/// 10. `[]` csl_spl_token_v_0_0_0: [AccountInfo] Auto-generated, CslSplTokenProgram v0.0.0
/// 11. `[]` csl_spl_assoc_token_v_0_0_0: [AccountInfo] Auto-generated, CslSplAssocTokenProgram v0.0.0
///
/// Data:
/// - name: [String] 
/// - game: [String] 
/// - location: [String] 
/// - seat: [String] 
/// - price: [f32] 
/// - date: [String] 
/// - class: [String] 
/// - available: [u32] 
/// - is_owned: [bool] 
/// - is_gift: [bool] 
/// - is_used: [bool] 
	MintTicket(MintTicketArgs),

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
	Gift,

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
	Transfer,

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
	Burn,

}

#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct MintTicketArgs {
	pub name: String,
	pub game: String,
	pub location: String,
	pub seat: String,
	pub price: f32,
	pub date: String,
	pub class: String,
	pub available: u32,
	pub is_owned: bool,
	pub is_gift: bool,
	pub is_used: bool,
}

impl TicketInstruction {
    pub fn unpack(input: &[u8]) -> Result<Self, ProgramError> {
        let (&variant, rest) = input.split_first().ok_or(TicketError::InvalidInstruction)?;

        Ok(match variant {
			0 => Self::MintTicket(MintTicketArgs::try_from_slice(rest).unwrap()),
			1 => Self::Gift,
			2 => Self::Transfer,
			3 => Self::Burn,
			_ => return Err(TicketError::InvalidInstruction.into())
        })
    }
}