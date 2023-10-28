# Solana-Bootcamp-Final-Project-Nami
Final Project for Solana Bootcamp October 2023

Domain - NFT
Use case - Ticket booking System

Fundamental explanation - Use NFT as a ticket for any event. We use current ongoing ICC Cricket World Cup 2023 as an event to focus on.

Methods - 
1 - Mint
- creating an NFT
- create another NFT for availability
- limit of creating the NFT due to limited number of seats in a stadium - 10
- 2 types of NFT for a single match - VIP (3) and Normal (7)
- ICC (admin or organiser) is the owner of the NFT at this point

2 - Transfer
- selling and buying an NFT - changing ownership of NFT
- Normal tickets can only be transferred one time - we dont allow reselling of the NFT - to avoid price manipulation

3 - Gift
- gifting an nft - changing ownership of NFT
- Only VIP tickets can be transferred as a gift - is allowed only one time

3 - Burn
- invalidating the NFT so that it cant be reused
- we still keep the ownership
- the nft now is immutable


NFT fields
- name
- match
- location
- seat
- price
- date
- class - vip or normal
- available
- isOwned
- isGift
- isUsed

