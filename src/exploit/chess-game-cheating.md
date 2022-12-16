---
title: Chess Game Cheating
description: 
tags:
	- Game
draft: false
---

## FEN Manipulation

Forsyth-Edwards Notation (FEN) is a standard notation for describing a particular position of a chess game. The file format is `.fen`.  
The [FEN Generator](http://www.netreal.de/Forsyth-Edwards-Notation/index.php) allows us to create a custom FEN string.  
For example, below is that our all staffs are queens except the king, and that of the enemy are pawns except the king.

```bash
pppkpppp/pppppppp/8/8/8/8/QQQQQQQQ/QQQQKQQQ
# or
ppppkppp/pppppppp/8/8/8/8/QQQQQQQQ/QQQQKQQQ w KQkq - 0 1
```

Then paste the FEN string to `.fen` file.  
Or paste in the [pastebin](https://pastebin.com/) and click “raw” button then we can get the URL link of the raw mode.  
This file can be able to be used for uploading, manipulating in the target website.
