// Seed games for demo/testing purposes
export const seedGames = [
  {
    id: 'seed-werewolf',
    name: 'Werewolf',
    emoji: '🐺',
    description: 'A social deduction game where villagers must identify hidden werewolves before being eliminated',
    ageRating: '12+',
    gameType: 'party',
    playerCount: { min: 7, max: 20 },
    duration: '30 min',
    equipment: ['Werewolf role cards', 'Paper and pen for moderator'],
    themes: ['Social', 'Bluffing', 'Strategy', 'Deduction'],
    rules: `**Setup:**
Deal one role card face-down to each player. You need 1 Moderator, 1 Seer, 1 Doctor, 2 Werewolves, and the rest are Villagers. Add a Werewolf for every 4 players if you have more than 15. Each player looks at their card secretly.

**Gameplay:**
The game alternates between Night and Day phases.

*Night Phase:*
1. Moderator says "Everyone close your eyes"
2. Werewolves wake up and silently agree on one player to eliminate
3. Doctor wakes up and chooses one player to protect (can be themselves)
4. Seer wakes up and points at a player - Moderator gives thumbs up (werewolf) or down (villager)

*Day Phase:*
1. Everyone opens their eyes
2. Moderator announces who was killed (or saved)
3. Villagers discuss and accuse each other
4. Vote to eliminate a suspected werewolf (majority needed)
5. Eliminated players don't reveal their role

**Objective:**
Villagers win by eliminating all Werewolves. Werewolves win when their numbers equal the remaining Villagers.`,
    upvotes: 47,
    downvotes: 3,
    createdAt: '2024-01-15T10:00:00Z',
    contributor: { name: 'GameMaster' }
  },
  {
    id: 'seed-gin-rummy',
    name: 'Gin Rummy',
    emoji: '🃏',
    description: 'Classic two-player card game where you collect melds and minimize deadwood',
    ageRating: '12+',
    gameType: 'card',
    playerCount: { min: 2, max: 2 },
    duration: '20 min',
    equipment: ['Standard deck of cards'],
    themes: ['Strategy', 'Classic', 'Competitive'],
    rules: `**Setup:**
Use a standard 52-card deck (no jokers). Deal 10 cards to each player. Place remaining cards face-down as the draw pile. Turn the top card face-up to start the discard pile.

**Card Values:**
- Face cards (K, Q, J) = 10 points
- Aces = 1 point
- Number cards = face value

**Gameplay:**
On your turn:
1. Draw one card (from draw pile OR top of discard pile)
2. Try to form melds in your hand:
   - Sets: 3-4 cards of the same rank (e.g., 8-8-8)
   - Runs: 3+ consecutive cards of same suit (e.g., 5-6-7 of hearts)
3. Discard one card face-up

*Knocking:* When your unmatched cards (deadwood) total 10 points or less, you may "knock" to end the round.

*Gin:* If all 10 cards form melds, you have "Gin" - bonus points!

**Objective:**
First player to reach 100 points wins.

*Scoring:*
- Gin: 20 points + opponent's deadwood value
- Knock: Difference in deadwood values
- Undercut (opponent has less deadwood): Opponent gets difference + 25 bonus`,
    upvotes: 32,
    downvotes: 2,
    createdAt: '2024-01-20T14:30:00Z',
    contributor: { name: 'CardShark' }
  },
  {
    id: 'seed-irish-snap',
    name: 'Irish Snap',
    emoji: '👋',
    description: 'Fast-paced card slapping game with multiple snap conditions - reflexes required!',
    ageRating: '12+',
    gameType: 'card',
    playerCount: { min: 2, max: 8 },
    duration: '15 min',
    equipment: ['Standard deck of cards'],
    themes: ['Speed', 'Reflexes', 'Party'],
    rules: `**Setup:**
Deal all cards face-down equally between players. No one looks at their cards - they stay face-down in a pile in front of each player.

**Gameplay:**
Starting left of dealer, take turns flipping your top card onto a central pile while saying the next number in sequence: "Ace, Two, Three... King, Ace, Two..."

**When to Snap (slap the pile):**
1. Card matches the number you said (say "Seven" and flip a 7)
2. Card matches the previous card on the pile (two 3s in a row)
3. A Jack is played (optional rule)

**After a Snap:**
- LAST person to slap takes the entire pile and adds it to the bottom of their stack
- If you slap when there's no snap (flinch), YOU take the pile
- Game continues from that player, starting count from Ace

**Objective:**
Get rid of all your cards. But you're not out when empty - you still count and must slap on snaps. You can gain cards back! Game ends when one player has ALL the cards.`,
    upvotes: 28,
    downvotes: 1,
    createdAt: '2024-02-01T09:15:00Z',
    contributor: { name: 'SnapQueen' }
  },
  {
    id: 'seed-kings',
    name: 'Kings',
    emoji: '👑',
    description: 'The classic drinking card game with rules for every card drawn',
    ageRating: '18+',
    gameType: 'drinking',
    playerCount: { min: 4, max: 10 },
    duration: '30 min',
    equipment: ['Standard deck of cards', 'Large cup', 'Drinks'],
    themes: ['Drinking', 'Party', 'Social'],
    rules: `**Setup:**
Spread cards face-down in a circle around an empty cup (the King's Cup). Players sit around the cards with their drinks.

**Gameplay:**
Take turns drawing cards. Each card has a rule:

- **Ace** - Waterfall: Everyone drinks. You can't stop until the person before you stops.
- **2** - You: Pick someone to drink
- **3** - Me: You drink
- **4** - Floor: Last to touch floor drinks
- **5** - Guys: All guys drink
- **6** - Chicks: All girls drink
- **7** - Heaven: Last to raise hand drinks
- **8** - Mate: Pick a drinking buddy for the game
- **9** - Rhyme: Say a word, go around rhyming until someone fails
- **10** - Categories: Pick a category, go around until someone fails
- **Jack** - Make a Rule: Create a rule everyone must follow
- **Queen** - Question Master: If you ask a question and someone answers, they drink
- **King** - Pour into King's Cup. Fourth King drawn = drink the cup!

**Objective:**
Don't be the one to draw the fourth King! Survive and have fun.`,
    upvotes: 65,
    downvotes: 5,
    createdAt: '2024-01-10T20:00:00Z',
    contributor: { name: 'PartyStarter' }
  },
  {
    id: 'seed-mafia',
    name: 'Mafia',
    emoji: '🔫',
    description: 'The original social deduction game - town vs mafia in a battle of wits',
    ageRating: '12+',
    gameType: 'party',
    playerCount: { min: 6, max: 15 },
    duration: '45 min',
    equipment: ['Role cards or paper slips'],
    themes: ['Social', 'Bluffing', 'Deduction', 'Strategy'],
    rules: `**Setup:**
Assign roles secretly: 1 Moderator, Mafia members (1 per 4 players), 1 Detective, 1 Doctor, rest are Townspeople.

**Gameplay:**
Alternates between Night and Day.

*Night:*
1. Everyone closes eyes
2. Mafia silently chooses a victim
3. Detective points at someone - Moderator nods yes/no if they're Mafia
4. Doctor chooses someone to save

*Day:*
1. Moderator announces who died (unless saved)
2. Town discusses who might be Mafia
3. Vote to execute someone (majority required)
4. Executed player reveals role

**Objective:**
Town wins by eliminating all Mafia. Mafia wins when they equal or outnumber Town.

**Tips:**
- Mafia should blend in and cast suspicion elsewhere
- Detective should be careful about revealing information
- Pay attention to who defends whom`,
    upvotes: 41,
    downvotes: 4,
    createdAt: '2024-01-12T16:45:00Z',
    contributor: { name: 'TownCrier' }
  },
  {
    id: 'seed-spoons',
    name: 'Spoons',
    emoji: '🥄',
    description: 'Fast card-passing game where you grab spoons when you get four of a kind',
    ageRating: '12+',
    gameType: 'party',
    playerCount: { min: 3, max: 8 },
    duration: '10 min',
    equipment: ['Standard deck of cards', 'Spoons (one less than players)'],
    themes: ['Speed', 'Reflexes', 'Party', 'Competitive'],
    rules: `**Setup:**
Place spoons in the center of the table - one fewer than the number of players. Deal 4 cards to each player. Keep remaining cards as draw pile near the dealer.

**Gameplay:**
1. Dealer draws a card, decides to keep or pass it
2. Pass unwanted cards face-down to player on your left
3. Continue rapidly - no taking turns, just keep passing!
4. Last player discards into a discard pile

*The Grab:*
When someone gets 4 of a kind, they grab a spoon. Once one spoon is grabbed, everyone races to grab one!

**Objective:**
Don't be the person without a spoon! That player gets a letter (S-P-O-O-N). Spell SPOON and you're out.

**Strategy:**
- Watch other players while sorting your cards
- You can grab a spoon subtly to catch others off guard
- Fake grabs are legal but risky!`,
    upvotes: 38,
    downvotes: 2,
    createdAt: '2024-01-25T11:20:00Z',
    contributor: { name: 'SpoonMaster' }
  }
];
