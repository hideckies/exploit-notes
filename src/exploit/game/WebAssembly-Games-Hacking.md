---
title: WebAssembly Games Hacking
description: 
tags:
    - Game
refs:
date: 2022-12-01
draft: false
---

## Tools

- **[Cetus](https://github.com/Qwokka/Cetus/)**
    
    A browser extension for hacking WebAssembly games. To use it, open developer tool in Chrome or Firefox, and select Cetus tab.

<br />

## Guess the Random Number

1. First off, try manually input the guessing number. Maybe you will fault then copy the result.
2. Open developer tool and Cetus, in Search panel, paste the number in the Value form.
3. Select “EQ (equal)”, and Value Type, Only Aligned Address?("yes").
4. Click “Search” button.
5. If you will not get the result, try again.
6. If you will get the result, click the bookmark icon on the right of the result.
7. Move to the Bookmarks panel.
8. You need to try the guessing, then you should know the value of the bookmark will change.
9. Convert the hex value to decimal number and input it.

<br />

## Manipulate Character’s Health

Reference: [https://github.com/Qwokka/Cetus/wiki/Cetus-101---Invincibility](https://github.com/Qwokka/Cetus/wiki/Cetus-101---Invincibility)

1. Open Search panel, empty value in the Value and click Search (or Restart Search) button.
2. Take damage on purpose.
3. In Search panel of the Cetus, select “LT” operator and search again.
4. It will show the results.
5. One of the results is most likely the Health you just lost, so bookmark it.
6. Move to the Bookmarks panel, check the “Freeze” on the address you’ve bookmarked now.
7. You've frozen your HP now, so taking damage shouldn't reduce your HP.