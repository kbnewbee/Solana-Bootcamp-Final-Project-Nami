// This file is auto-generated from the CIDL source.
// Editing this file directly is not recommended as it may be overwritten.

use std::str::FromStr;
use borsh::BorshSerialize;
use solana_program::account_info::{AccountInfo, next_account_info, next_account_infos};
use solana_program::borsh0_10::try_from_slice_unchecked;
use solana_program::entrypoint::ProgramResult;
use solana_program::program::{invoke, invoke_signed};
use solana_program::pubkey::Pubkey;
use solana_program::rent::Rent;
use solana_program::system_instruction::create_account;
use solana_program::{msg, system_program};
use solana_program::sysvar::Sysvar;
use solana_program::program_pack::Pack;
use crate::generated::errors::TicketError;
use crate::generated::instructions::TicketInstruction;

use crate::generated::state::{
	Account,
	AccountPDA,
	TicketMetadata,
};
use crate::src::*;

pub struct Processor;

impl Processor {
    pub fn process(
        program_id: &Pubkey,
        accounts: &[AccountInfo],
        data: &[u8],
    ) -> ProgramResult {
        let instruction = TicketInstruction::unpack(data)?;

        match instruction {
			TicketInstruction::MintTicket(args) => {
				msg!("Instruction: MintTicket");
				Self::process_mint_ticket(
					program_id,
					accounts, 
					args.name,
					args.game,
					args.location,
					args.seat,
					args.price,
					args.date,
					args.class,
					args.available,
					args.is_owned,
					args.is_gift,
					args.is_used,
				)
			}
			TicketInstruction::Gift => {
				msg!("Instruction: Gift");
				Self::process_gift(program_id, accounts)
			}
			TicketInstruction::Transfer => {
				msg!("Instruction: Transfer");
				Self::process_transfer(program_id, accounts)
			}
			TicketInstruction::Burn => {
				msg!("Instruction: Burn");
				Self::process_burn(program_id, accounts)
			}
        }
    }

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
	pub fn process_mint_ticket(
		program_id: &Pubkey,
		accounts: &[AccountInfo],
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
		let account_info_iter = &mut accounts.iter();
		let fee_payer_info = next_account_info(account_info_iter)?;
		let mint_ticket_info = next_account_info(account_info_iter)?;
		let ticket_info = next_account_info(account_info_iter)?;
		let system_program_info = next_account_info(account_info_iter)?;
		let mint_info = next_account_info(account_info_iter)?;
		let funding_info = next_account_info(account_info_iter)?;
		let assoc_token_account_info = next_account_info(account_info_iter)?;
		let wallet_info = next_account_info(account_info_iter)?;
		let token_program_info = next_account_info(account_info_iter)?;
		let owner_info = next_account_info(account_info_iter)?;
		let csl_spl_token_v_0_0_0_info = next_account_info(account_info_iter)?;
		let csl_spl_assoc_token_v_0_0_0_info = next_account_info(account_info_iter)?;

		// Derive PDAs
		let (ticket_pubkey, ticket_bump) = Pubkey::find_program_address(
			&[b"ticket", mint_ticket_info.key.as_ref()],
			program_id,
		);

		// Security Checks
		if fee_payer_info.is_signer != true {
			return Err(TicketError::InvalidSignerPermission.into());
		}

		if mint_ticket_info.is_signer != true {
			return Err(TicketError::InvalidSignerPermission.into());
		}

		if *ticket_info.key != ticket_pubkey {
			return Err(TicketError::NotExpectedAddress.into());
		}

		if *system_program_info.key != Pubkey::from_str("11111111111111111111111111111111").unwrap() {
			return Err(TicketError::NotExpectedAddress.into());
		}

		if funding_info.is_signer != true {
			return Err(TicketError::InvalidSignerPermission.into());
		}

		if *token_program_info.key != Pubkey::from_str("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA").unwrap() {
			return Err(TicketError::NotExpectedAddress.into());
		}

		if owner_info.is_signer != true {
			return Err(TicketError::InvalidSignerPermission.into());
		}

		if *csl_spl_token_v_0_0_0_info.key != Pubkey::from_str("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA").unwrap() {
			return Err(TicketError::NotExpectedAddress.into());
		}

		if *csl_spl_assoc_token_v_0_0_0_info.key != Pubkey::from_str("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL").unwrap() {
			return Err(TicketError::NotExpectedAddress.into());
		}


		// Accounts Initializations
		let space = spl_token::state::Mint::LEN;
		let rent = Rent::get()?;
		let rent_minimum_balance = rent.minimum_balance(space);

		invoke(
			&create_account(
				&fee_payer_info.key,
				&mint_ticket_info.key,
				rent_minimum_balance,
				space as u64,
				&Pubkey::from_str("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA").unwrap(),
			),
			&[fee_payer_info.clone(), mint_ticket_info.clone()],
		)?;

		let space = TicketMetadata::LEN;
		let rent = Rent::get()?;
		let rent_minimum_balance = rent.minimum_balance(space);

		invoke_signed(
			&create_account(
				&fee_payer_info.key,
				&ticket_info.key,
				rent_minimum_balance,
				space as u64,
				program_id,
			),
			&[fee_payer_info.clone(), ticket_info.clone()],
			&[&[b"ticket", mint_ticket_info.key.as_ref(), &[ticket_bump]]],
		)?;


		// Security Checks
		if *fee_payer_info.owner != Pubkey::from_str("11111111111111111111111111111111").unwrap() {
			return Err(TicketError::WrongAccountOwner.into());
		}

		if *mint_ticket_info.owner != Pubkey::from_str("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA").unwrap() {
			return Err(TicketError::WrongAccountOwner.into());
		}

		if *mint_info.owner != Pubkey::from_str("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA").unwrap() {
			return Err(TicketError::WrongAccountOwner.into());
		}

		if *funding_info.owner != Pubkey::from_str("11111111111111111111111111111111").unwrap() {
			return Err(TicketError::WrongAccountOwner.into());
		}

		if *wallet_info.owner != Pubkey::from_str("11111111111111111111111111111111").unwrap() {
			return Err(TicketError::WrongAccountOwner.into());
		}

		if mint_ticket_info.data_len() != spl_token::state::Mint::LEN {
			return Err(TicketError::InvalidAccountLen.into());
		}

		if ticket_info.data_len() != TicketMetadata::LEN {
			return Err(TicketError::InvalidAccountLen.into());
		}

		if mint_info.data_len() != spl_token::state::Mint::LEN {
			return Err(TicketError::InvalidAccountLen.into());
		}


		// Accounts Deserialization
		let mint_ticket = Account::new(
			&mint_ticket_info,
			spl_token::state::Mint::unpack_from_slice(&mint_ticket_info.data.borrow()).unwrap(),
		);
		let ticket = &mut AccountPDA::new(
			&ticket_info,
			try_from_slice_unchecked::<TicketMetadata>(&ticket_info.data.borrow()).unwrap(),
			ticket_bump,
		);
		let mint = Account::new(
			&mint_info,
			spl_token::state::Mint::unpack_from_slice(&mint_info.data.borrow()).unwrap(),
		);

		// Calling STUB
		mint_ticket::mint_ticket(
			program_id,
			&vec![
				mint_info,
			],
			&vec![
				funding_info,
				assoc_token_account_info,
				wallet_info,
				mint_info,
				system_program_info,
				token_program_info,
			],
			&vec![
				mint_info,
				assoc_token_account_info,
				owner_info,
				wallet_info,
				token_program_info,
			],
			&vec![
				mint_info,
				owner_info,
			],
			&mint_ticket,
			ticket,
			&mint,
			funding_info,
			assoc_token_account_info,
			wallet_info,
			owner_info,
			name,
			game,
			location,
			seat,
			price,
			date,
			class,
			available,
			is_owned,
			is_gift,
			is_used,
		)?;

		// Accounts Serialization
		ticket.data.serialize(&mut &mut ticket_info.data.borrow_mut()[..])?;
		
		Ok(())
	}

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
	pub fn process_gift(
		program_id: &Pubkey,
		accounts: &[AccountInfo],
	) -> ProgramResult {
		let account_info_iter = &mut accounts.iter();
		let fee_payer_info = next_account_info(account_info_iter)?;
		let mint_ticket_info = next_account_info(account_info_iter)?;
		let ticket_info = next_account_info(account_info_iter)?;
		let funding_info = next_account_info(account_info_iter)?;
		let assoc_token_account_info = next_account_info(account_info_iter)?;
		let wallet_info = next_account_info(account_info_iter)?;
		let mint_info = next_account_info(account_info_iter)?;
		let system_program_info = next_account_info(account_info_iter)?;
		let token_program_info = next_account_info(account_info_iter)?;
		let source_info = next_account_info(account_info_iter)?;
		let destination_info = next_account_info(account_info_iter)?;
		let authority_info = next_account_info(account_info_iter)?;
		let csl_spl_assoc_token_v_0_0_0_info = next_account_info(account_info_iter)?;
		let csl_spl_token_v_0_0_0_info = next_account_info(account_info_iter)?;

		// Derive PDAs
		let (ticket_pubkey, ticket_bump) = Pubkey::find_program_address(
			&[b"ticket", mint_ticket_info.key.as_ref()],
			program_id,
		);

		// Security Checks
		if fee_payer_info.is_signer != true {
			return Err(TicketError::InvalidSignerPermission.into());
		}

		if *ticket_info.key != ticket_pubkey {
			return Err(TicketError::NotExpectedAddress.into());
		}

		if funding_info.is_signer != true {
			return Err(TicketError::InvalidSignerPermission.into());
		}

		if *system_program_info.key != Pubkey::from_str("11111111111111111111111111111111").unwrap() {
			return Err(TicketError::NotExpectedAddress.into());
		}

		if *token_program_info.key != Pubkey::from_str("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA").unwrap() {
			return Err(TicketError::NotExpectedAddress.into());
		}

		if authority_info.is_signer != true {
			return Err(TicketError::InvalidSignerPermission.into());
		}

		if *csl_spl_assoc_token_v_0_0_0_info.key != Pubkey::from_str("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL").unwrap() {
			return Err(TicketError::NotExpectedAddress.into());
		}

		if *csl_spl_token_v_0_0_0_info.key != Pubkey::from_str("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA").unwrap() {
			return Err(TicketError::NotExpectedAddress.into());
		}



		// Security Checks
		if *fee_payer_info.owner != Pubkey::from_str("11111111111111111111111111111111").unwrap() {
			return Err(TicketError::WrongAccountOwner.into());
		}

		if *mint_ticket_info.owner != Pubkey::from_str("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA").unwrap() {
			return Err(TicketError::WrongAccountOwner.into());
		}

		if *funding_info.owner != Pubkey::from_str("11111111111111111111111111111111").unwrap() {
			return Err(TicketError::WrongAccountOwner.into());
		}

		if *wallet_info.owner != Pubkey::from_str("11111111111111111111111111111111").unwrap() {
			return Err(TicketError::WrongAccountOwner.into());
		}

		if *mint_info.owner != Pubkey::from_str("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA").unwrap() {
			return Err(TicketError::WrongAccountOwner.into());
		}

		if mint_ticket_info.data_len() != spl_token::state::Mint::LEN {
			return Err(TicketError::InvalidAccountLen.into());
		}

		if ticket_info.data_len() != TicketMetadata::LEN {
			return Err(TicketError::InvalidAccountLen.into());
		}

		if mint_info.data_len() != spl_token::state::Mint::LEN {
			return Err(TicketError::InvalidAccountLen.into());
		}


		// Accounts Deserialization
		let mint_ticket = Account::new(
			&mint_ticket_info,
			spl_token::state::Mint::unpack_from_slice(&mint_ticket_info.data.borrow()).unwrap(),
		);
		let ticket = &mut AccountPDA::new(
			&ticket_info,
			try_from_slice_unchecked::<TicketMetadata>(&ticket_info.data.borrow()).unwrap(),
			ticket_bump,
		);
		let mint = Account::new(
			&mint_info,
			spl_token::state::Mint::unpack_from_slice(&mint_info.data.borrow()).unwrap(),
		);

		// Calling STUB
		gift::gift(
			program_id,
			&vec![
				funding_info,
				assoc_token_account_info,
				wallet_info,
				mint_info,
				system_program_info,
				token_program_info,
			],
			&vec![
				source_info,
				mint_info,
				destination_info,
				authority_info,
			],
			&mint_ticket,
			ticket,
			funding_info,
			assoc_token_account_info,
			wallet_info,
			&mint,
			source_info,
			destination_info,
			authority_info,
		)?;

		// Accounts Serialization
		ticket.data.serialize(&mut &mut ticket_info.data.borrow_mut()[..])?;		
		Ok(())
	}

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
	pub fn process_transfer(
		program_id: &Pubkey,
		accounts: &[AccountInfo],
	) -> ProgramResult {
		let account_info_iter = &mut accounts.iter();
		let fee_payer_info = next_account_info(account_info_iter)?;
		let mint_ticket_info = next_account_info(account_info_iter)?;
		let ticket_info = next_account_info(account_info_iter)?;
		let funding_info = next_account_info(account_info_iter)?;
		let assoc_token_account_info = next_account_info(account_info_iter)?;
		let wallet_info = next_account_info(account_info_iter)?;
		let mint_info = next_account_info(account_info_iter)?;
		let system_program_info = next_account_info(account_info_iter)?;
		let token_program_info = next_account_info(account_info_iter)?;
		let source_info = next_account_info(account_info_iter)?;
		let destination_info = next_account_info(account_info_iter)?;
		let authority_info = next_account_info(account_info_iter)?;
		let csl_spl_assoc_token_v_0_0_0_info = next_account_info(account_info_iter)?;
		let csl_spl_token_v_0_0_0_info = next_account_info(account_info_iter)?;

		// Derive PDAs
		let (ticket_pubkey, ticket_bump) = Pubkey::find_program_address(
			&[b"ticket", mint_ticket_info.key.as_ref()],
			program_id,
		);

		// Security Checks
		if fee_payer_info.is_signer != true {
			return Err(TicketError::InvalidSignerPermission.into());
		}

		if *ticket_info.key != ticket_pubkey {
			return Err(TicketError::NotExpectedAddress.into());
		}

		if funding_info.is_signer != true {
			return Err(TicketError::InvalidSignerPermission.into());
		}

		if *system_program_info.key != Pubkey::from_str("11111111111111111111111111111111").unwrap() {
			return Err(TicketError::NotExpectedAddress.into());
		}

		if *token_program_info.key != Pubkey::from_str("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA").unwrap() {
			return Err(TicketError::NotExpectedAddress.into());
		}

		if authority_info.is_signer != true {
			return Err(TicketError::InvalidSignerPermission.into());
		}

		if *csl_spl_assoc_token_v_0_0_0_info.key != Pubkey::from_str("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL").unwrap() {
			return Err(TicketError::NotExpectedAddress.into());
		}

		if *csl_spl_token_v_0_0_0_info.key != Pubkey::from_str("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA").unwrap() {
			return Err(TicketError::NotExpectedAddress.into());
		}



		// Security Checks
		if *fee_payer_info.owner != Pubkey::from_str("11111111111111111111111111111111").unwrap() {
			return Err(TicketError::WrongAccountOwner.into());
		}

		if *mint_ticket_info.owner != Pubkey::from_str("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA").unwrap() {
			return Err(TicketError::WrongAccountOwner.into());
		}

		if *funding_info.owner != Pubkey::from_str("11111111111111111111111111111111").unwrap() {
			return Err(TicketError::WrongAccountOwner.into());
		}

		if *wallet_info.owner != Pubkey::from_str("11111111111111111111111111111111").unwrap() {
			return Err(TicketError::WrongAccountOwner.into());
		}

		if *mint_info.owner != Pubkey::from_str("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA").unwrap() {
			return Err(TicketError::WrongAccountOwner.into());
		}

		if mint_ticket_info.data_len() != spl_token::state::Mint::LEN {
			return Err(TicketError::InvalidAccountLen.into());
		}

		if ticket_info.data_len() != TicketMetadata::LEN {
			return Err(TicketError::InvalidAccountLen.into());
		}

		if mint_info.data_len() != spl_token::state::Mint::LEN {
			return Err(TicketError::InvalidAccountLen.into());
		}


		// Accounts Deserialization
		let mint_ticket = Account::new(
			&mint_ticket_info,
			spl_token::state::Mint::unpack_from_slice(&mint_ticket_info.data.borrow()).unwrap(),
		);
		let ticket = &mut AccountPDA::new(
			&ticket_info,
			try_from_slice_unchecked::<TicketMetadata>(&ticket_info.data.borrow()).unwrap(),
			ticket_bump,
		);
		let mint = Account::new(
			&mint_info,
			spl_token::state::Mint::unpack_from_slice(&mint_info.data.borrow()).unwrap(),
		);

		// Calling STUB
		transfer::transfer(
			program_id,
			&vec![
				funding_info,
				assoc_token_account_info,
				wallet_info,
				mint_info,
				system_program_info,
				token_program_info,
			],
			&vec![
				source_info,
				mint_info,
				destination_info,
				authority_info,
			],
			&mint_ticket,
			ticket,
			funding_info,
			assoc_token_account_info,
			wallet_info,
			&mint,
			source_info,
			destination_info,
			authority_info,
		)?;

		// Accounts Serialization
		ticket.data.serialize(&mut &mut ticket_info.data.borrow_mut()[..])?;		
		Ok(())
	}

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
	pub fn process_burn(
		program_id: &Pubkey,
		accounts: &[AccountInfo],
	) -> ProgramResult {
		let account_info_iter = &mut accounts.iter();
		let fee_payer_info = next_account_info(account_info_iter)?;
		let mint_ticket_info = next_account_info(account_info_iter)?;
		let ticket_info = next_account_info(account_info_iter)?;
		let account_info = next_account_info(account_info_iter)?;
		let mint_info = next_account_info(account_info_iter)?;
		let owner_info = next_account_info(account_info_iter)?;
		let wallet_info = next_account_info(account_info_iter)?;
		let token_program_info = next_account_info(account_info_iter)?;
		let csl_spl_token_v_0_0_0_info = next_account_info(account_info_iter)?;

		// Derive PDAs
		let (ticket_pubkey, ticket_bump) = Pubkey::find_program_address(
			&[b"ticket", mint_ticket_info.key.as_ref()],
			program_id,
		);
		let (account_pubkey, account_bump) = Pubkey::find_program_address(
			&[wallet_info.key.as_ref(), token_program_info.key.as_ref(), mint_info.key.as_ref()],
			&Pubkey::from_str("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL").unwrap(),
		);

		// Security Checks
		if fee_payer_info.is_signer != true {
			return Err(TicketError::InvalidSignerPermission.into());
		}

		if *ticket_info.key != ticket_pubkey {
			return Err(TicketError::NotExpectedAddress.into());
		}

		if *account_info.key != account_pubkey {
			return Err(TicketError::NotExpectedAddress.into());
		}

		if owner_info.is_signer != true {
			return Err(TicketError::InvalidSignerPermission.into());
		}

		if *token_program_info.key != Pubkey::from_str("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA").unwrap() {
			return Err(TicketError::NotExpectedAddress.into());
		}

		if *csl_spl_token_v_0_0_0_info.key != Pubkey::from_str("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA").unwrap() {
			return Err(TicketError::NotExpectedAddress.into());
		}



		// Security Checks
		if *fee_payer_info.owner != Pubkey::from_str("11111111111111111111111111111111").unwrap() {
			return Err(TicketError::WrongAccountOwner.into());
		}

		if *mint_ticket_info.owner != Pubkey::from_str("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA").unwrap() {
			return Err(TicketError::WrongAccountOwner.into());
		}

		if *mint_info.owner != Pubkey::from_str("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA").unwrap() {
			return Err(TicketError::WrongAccountOwner.into());
		}

		if *wallet_info.owner != Pubkey::from_str("11111111111111111111111111111111").unwrap() {
			return Err(TicketError::WrongAccountOwner.into());
		}

		if mint_ticket_info.data_len() != spl_token::state::Mint::LEN {
			return Err(TicketError::InvalidAccountLen.into());
		}

		if ticket_info.data_len() != TicketMetadata::LEN {
			return Err(TicketError::InvalidAccountLen.into());
		}

		if account_info.data_len() != spl_token::state::Account::LEN {
			return Err(TicketError::InvalidAccountLen.into());
		}

		if mint_info.data_len() != spl_token::state::Mint::LEN {
			return Err(TicketError::InvalidAccountLen.into());
		}


		// Accounts Deserialization
		let mint_ticket = Account::new(
			&mint_ticket_info,
			spl_token::state::Mint::unpack_from_slice(&mint_ticket_info.data.borrow()).unwrap(),
		);
		let ticket = &mut AccountPDA::new(
			&ticket_info,
			try_from_slice_unchecked::<TicketMetadata>(&ticket_info.data.borrow()).unwrap(),
			ticket_bump,
		);
		let account = AccountPDA::new(
			&account_info,
			spl_token::state::Account::unpack_from_slice(&account_info.data.borrow()).unwrap(),
			account_bump,
		);
		let mint = Account::new(
			&mint_info,
			spl_token::state::Mint::unpack_from_slice(&mint_info.data.borrow()).unwrap(),
		);

		// Calling STUB
		burn::burn(
			program_id,
			&vec![
				account_info,
				mint_info,
				owner_info,
				wallet_info,
				token_program_info,
			],
			&mint_ticket,
			ticket,
			&account,
			&mint,
			owner_info,
			wallet_info,
		)?;

		// Accounts Serialization
		ticket.data.serialize(&mut &mut ticket_info.data.borrow_mut()[..])?;		
		Ok(())
	}
}