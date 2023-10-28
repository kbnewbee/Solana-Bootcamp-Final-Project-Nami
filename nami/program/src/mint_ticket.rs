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
pub fn mint_ticket(
	program_id: &Pubkey,
	for_initialize_mint_2: &[&AccountInfo],
	for_create: &[&AccountInfo],
	for_mint_to: &[&AccountInfo],
	for_set_authority: &[&AccountInfo],
	mint_ticket: &Account<spl_token::state::Mint>,
	ticket: &mut AccountPDA<TicketMetadata>,
	mint: &Account<spl_token::state::Mint>,
	funding: &AccountInfo,
	assoc_token_account: &AccountInfo,
	wallet: &AccountInfo,
	owner: &AccountInfo,
	name: String,
	game: String,
	location: String,
	seat: String,
	price: f32,
	date: String,
	class: String,
	available: u32,
	is_owned: bool,
	is_gift: bool,
	is_used: bool,
) -> ProgramResult {
    
    ticket.data.name = name;
    ticket.data.game = game;
    ticket.data.location = location;
    ticket.data.seat = seat;
    ticket.data.price = price;
    ticket.data.date = date;
    ticket.data.class = class;
    ticket.data.available = available;
    ticket.data.is_owned = is_owned;
    ticket.data.is_gift = is_gift;
    ticket.data.is_used = is_used;
    
    ticket.data.mint_ticket = *mint.info.key;

    //ticket.data.mint = *mint.info.key;
    ticket.data.assoc_account = Some(*assoc_token_account.key);

    csl_spl_token::src::cpi::initialize_mint_2(for_initialize_mint_2, 0, *wallet.key, None)?;
    csl_spl_assoc_token::src::cpi::create(for_create)?;
    csl_spl_token::src::cpi::mint_to(for_mint_to, 1)?;
    csl_spl_token::src::cpi::set_authority(for_set_authority, 0, None)?;

    Ok(())
}