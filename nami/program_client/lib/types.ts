// This file is auto-generated from the CIDL source.
// Editing this file directly is not recommended as it may be overwritten.

import type {Schema} from 'borsh';
import type {Decoded} from "./utils";
import {PublicKey} from "@solana/web3.js";
import { deserialize } from "borsh";

export interface TicketMetadata {
  name: string;
  game: string;
  location: string;
  seat: string;
  date: string;
  price: number;
  class: string;
  available: number;
  isOwned: boolean;
  isGift: boolean;
  isUsed: boolean;
  mintTicket: PublicKey;
  assocAccount: PublicKey | undefined;
}

export const decodeTicketMetadata = (decoded: Decoded): TicketMetadata => ({
    name: decoded["name"] as string,
    game: decoded["game"] as string,
    location: decoded["location"] as string,
    seat: decoded["seat"] as string,
    date: decoded["date"] as string,
    price: decoded["price"] as number,
    class: decoded["class"] as string,
    available: decoded["available"] as number,
    isOwned: decoded["is_owned"] as boolean,
    isGift: decoded["is_gift"] as boolean,
    isUsed: decoded["is_used"] as boolean,
    mintTicket: new PublicKey(decoded["mint_ticket"] as Uint8Array),
    assocAccount: decoded["assoc_account"] ? new PublicKey(decoded["assoc_account"]) : undefined,
});

export const TicketMetadataSchema: Schema =  {
    struct: {
        name: "string",
        game: "string",
        location: "string",
        seat: "string",
        date: "string",
        price: "f32",
        class: "string",
        available: "u32",
        is_owned: "bool",
        is_gift: "bool",
        is_used: "bool",
        mint_ticket: { array: { type: "u8", len: 32 } },
        assoc_account: { option: { array: { type: "u8", len: 32 } } },
    }
};

export module CslSplTokenTypes {
    /// Mint data.
    export interface Mint {
      mintAuthority: PublicKey;
      supply: bigint;
      decimals: number;
      isInitialized: boolean;
      freezeAuthority: PublicKey;
    }
    
    export const decodeMint = (decoded: Decoded): Mint => ({
        mintAuthority: new PublicKey(decoded["mint_authority"] as Uint8Array),
        supply: decoded["supply"] as bigint,
        decimals: decoded["decimals"] as number,
        isInitialized: decoded["is_initialized"] as boolean,
        freezeAuthority: new PublicKey(decoded["freeze_authority"] as Uint8Array),
    });
    
    export const MintSchema: Schema =  {
        struct: {
            mint_authority: { array: { type: "u8", len: 32 } },
            supply: "u64",
            decimals: "u8",
            is_initialized: "bool",
            freeze_authority: { array: { type: "u8", len: 32 } },
        }
    };
    
    /// Account data
    export interface Account {
      mint: PublicKey;
      owner: PublicKey;
      amount: bigint;
      delegate: PublicKey;
      state: number;
      isNative: bigint;
      delegatedAmount: bigint;
      closeAuthority: PublicKey;
    }
    
    export const decodeAccount = (decoded: Decoded): Account => ({
        mint: new PublicKey(decoded["mint"] as Uint8Array),
        owner: new PublicKey(decoded["owner"] as Uint8Array),
        amount: decoded["amount"] as bigint,
        delegate: new PublicKey(decoded["delegate"] as Uint8Array),
        state: decoded["state"] as number,
        isNative: decoded["is_native"] as bigint,
        delegatedAmount: decoded["delegated_amount"] as bigint,
        closeAuthority: new PublicKey(decoded["close_authority"] as Uint8Array),
    });
    
    export const AccountSchema: Schema =  {
        struct: {
            mint: { array: { type: "u8", len: 32 } },
            owner: { array: { type: "u8", len: 32 } },
            amount: "u64",
            delegate: { array: { type: "u8", len: 32 } },
            state: "u8",
            is_native: "u64",
            delegated_amount: "u64",
            close_authority: { array: { type: "u8", len: 32 } },
        }
    };
    
}



