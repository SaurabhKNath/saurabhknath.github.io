/*
      XOBDLE DAILY PUZZLES
      -------------------
      Add about 7 dated puzzles at a time.

      Each puzzle needs:
      - answer: exactly 5 playable aksharas
      - displayAnswer: the full word shown in "Yesterday’s Xobdle"
      - keys: exactly 28 keyboard aksharas

      Dates are interpreted in IST (Asia/Kolkata).
    */

    const puzzles = {
      "2026-08-29": {
        answer: ["গা", "মো", "চা", "খ", "ন"],
        displayAnswer: "গামোচাখন",
        keys: [
          "গা","মো","চা","খ","ন","কি","তা","প",
          "মা","নু","হ","জ","ক","ল","বা","গি",
          "ৰি","সা","ট","দে","পা","ৰ","ফু","নী",
          "ডা","শি","ব","তো"
        ]
      },

      "2026-08-30": {
        answer: ["মা", "নু", "হ", "জ", "ন"],
        displayAnswer: "মানুহজন",
        keys: [
          "মা","নু","হ","জ","ন","গা","মো","চা",
          "কি","তা","পা","ৰ","বা","লি","ক","খ",
          "দে","শ","ঘ","ৰ","ফু","ল","নী","লা",
          "সা","ধা","ৰ","ণ"
        ]
      },

      "2026-08-31": {
        answer: ["কি", "তা", "প", "খ", "ন"],
        displayAnswer: "কিতাপখন",
        keys: [
          "কি","তা","প","খ","ন","মা","নু","হ",
          "গা","মো","চা","জ","ল","বা","ৰি","সা",
          "দে","শ","ঘ","ৰ","ফু","নী","লা","ক",
          "টো","পা","ধা","ৰ"
        ]
      },

      "2026-09-01": {
        answer: ["ফু", "ল", "নি", "খ", "ন"],
        displayAnswer: "ফুলনিখন",
        keys: [
          "ফু","ল","নি","খ","ন","গা","মো","চা",
          "মা","নু","হ","কি","তা","প","বা","ৰি",
          "সা","জ","দে","শ","ঘ","ৰ","নী","লা",
          "ক","টো","পা","ধা"
        ]
      },

      "2026-09-02": {
        answer: ["বা", "গি", "চা", "খ", "ন"],
        displayAnswer: "বাগিচাখন",
        keys: [
          "বা","গি","চা","খ","ন","গা","মো","কি",
          "তা","প","মা","নু","হ","জ","ল","ৰি",
          "সা","দে","শ","ঘ","ৰ","ফু","নী","লা",
          "ক","টো","পা","ধা"
        ]
      },

      "2026-09-03": {
        answer: ["দে", "শ", "খ", "ন", "ত"],
        displayAnswer: "দেশখনত",
        keys: [
          "দে","শ","খ","ন","ত","গা","মো","চা",
          "মা","নু","হ","কি","তা","প","বা","গি",
          "ৰি","সা","জ","ঘ","ৰ","ফু","ল","নী",
          "ক","টো","পা","ধা"
        ]
      },

      "2026-09-04": {
        answer: ["ঘ", "ৰ", "টো", "ত", "হে"],
        displayAnswer: "ঘৰটোতহে",
        keys: [
          "ঘ","ৰ","টো","ত","হে","গা","মো","চা",
          "মা","নু","হ","কি","তা","প","বা","গি",
          "ৰি","সা","জ","দে","শ","ফু","ল","নী",
          "ক","খ","পা","ধা"
        ]
      }
    };

    /*
      TEST MODE
      ---------
      Keep this as null for the live site.
      To test another day, temporarily use for example:
      const TEST_DATE = "2026-08-30";
    */
    const TEST_DATE = "2026-08-31";

    function getISTISODate(offsetDays = 0) {
      if (TEST_DATE) {
        const base = new Date(TEST_DATE + "T12:00:00Z");
        base.setUTCDate(base.getUTCDate() + offsetDays);

        return [
          base.getUTCFullYear(),
          String(base.getUTCMonth() + 1).padStart(2, "0"),
          String(base.getUTCDate()).padStart(2, "0")
        ].join("-");
      }

      const now = new Date();

      const formatter = new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
      });

      const parts = formatter.formatToParts(now);
      const values = Object.fromEntries(
        parts
          .filter(part => part.type !== "literal")
          .map(part => [part.type, part.value])
      );

      const base = new Date(
        Date.UTC(
          Number(values.year),
          Number(values.month) - 1,
          Number(values.day) + offsetDays,
          12, 0, 0
        )
      );

      return [
        base.getUTCFullYear(),
        String(base.getUTCMonth() + 1).padStart(2, "0"),
        String(base.getUTCDate()).padStart(2, "0")
      ].join("-");
    }

    const todayPuzzleKey = getISTISODate(0);
    const yesterdayPuzzleKey = getISTISODate(-1);

    const todayPuzzle = puzzles[todayPuzzleKey];
    const yesterdayPuzzle = puzzles[yesterdayPuzzleKey];

    if (!todayPuzzle) {
      throw new Error(
        "No Xobdle puzzle is scheduled for " + todayPuzzleKey +
        ". Add that IST date to the puzzles object."
      );
    }

    const answer = todayPuzzle.answer;
    const keys = todayPuzzle.keys;

    if (!Array.isArray(answer) || answer.length !== 5) {
      throw new Error("Today's Xobdle answer must contain exactly 5 aksharas.");
    }

    if (!Array.isArray(keys) || keys.length !== 28) {
      throw new Error("Today's Xobdle keyboard must contain exactly 28 aksharas.");
    }

    const keyboardRows = [
      keys.slice(0, 8),
      keys.slice(8, 16),
      keys.slice(16, 24),
      keys.slice(24, 28)
    ];

    const MAX_GUESSES = 5;
    const WORD_LENGTH = 5;

    let currentGuess = [];
    let guesses = [];
    let evaluations = [];
    let gameOver = false;

    let gameStartedAt = null;
    let gameFinishedAt = null;
    let elapsedSeconds = 0;
    let timerInterval = null;

    function getISTDateParts(offsetDays = 0) {
      const now = new Date();
      const istMs = now.getTime() + (5.5 * 60 * 60 * 1000);
      const istDate = new Date(istMs);

      if (offsetDays !== 0) {
        istDate.setUTCDate(istDate.getUTCDate() + offsetDays);
      }

      return {
        year: istDate.getUTCFullYear(),
        month: istDate.getUTCMonth() + 1,
        day: istDate.getUTCDate()
      };
    }

    function todayStorageKey() {
      return `xobdle-${todayPuzzleKey}`;
    }

    function saveTodayState() {
      const state = {
        completed: gameOver,
        guesses,
        evaluations,
        currentGuess,
        elapsedSeconds,
        startedAt: gameStartedAt,
        finishedAt: gameFinishedAt
      };

      try {
        localStorage.setItem(todayStorageKey(), JSON.stringify(state));
      } catch (error) {
        console.warn("Could not save today's Xobdle state:", error);
      }
    }

    function loadTodayState() {
      try {
        const raw = localStorage.getItem(todayStorageKey());
        return raw ? JSON.parse(raw) : null;
      } catch (error) {
        console.warn("Could not load today's Xobdle state:", error);
        return null;
      }
    }

    function restoreTodayState() {
      const state = loadTodayState();
      if (!state) return false;

      guesses = Array.isArray(state.guesses) ? state.guesses : [];
      evaluations = Array.isArray(state.evaluations) ? state.evaluations : [];
      currentGuess = Array.isArray(state.currentGuess) ? state.currentGuess : [];
      elapsedSeconds = Number(state.elapsedSeconds || 0);
      gameStartedAt = state.startedAt || null;

      if (state.completed) {
        gameOver = true;
        gameFinishedAt = state.finishedAt || Date.now();
      }

      renderBoard();
      updateKeyboardStatuses();

      if (state.completed) {
        window.setTimeout(showResult, 120);
      }

      return true;
    }

    const board = document.getElementById("board");
    const keyboard = document.getElementById("keyboard");
    const message = document.getElementById("message");

    const resultCanvas = document.getElementById("resultCanvas");
    const ctx = resultCanvas.getContext("2d");

    const COLORS = {
      background: "#ffffff",
      card: "#ffffff",
      text: "#202020",
      muted: "#8b877f",
      green: "#4f8c65",
      yellow: "#c39a3b",
      gray: "#aaa49c",
      emptyBorder: "#d4cec5",
      orange: "#d96f32"
    };



    const yesterdayOverlay = document.getElementById("yesterdayOverlay");
    const yesterdayBtn = document.getElementById("yesterdayBtn");
    const yesterdayClose = document.getElementById("yesterdayClose");

    function formattedYesterdayDate() {
      const { year, month, day } = getISTDateParts(-1);

      return new Intl.DateTimeFormat("en-AU", {
        day: "numeric",
        month: "short",
        year: "numeric",
        timeZone: "Asia/Kolkata"
      }).format(new Date(Date.UTC(year, month - 1, day, 12, 0, 0)));
    }

    document.getElementById("yesterdayDate").textContent = formattedYesterdayDate();

    const yesterdayAnswerEl = document.getElementById("yesterdayAnswer");

    if (yesterdayPuzzle && yesterdayPuzzle.displayAnswer) {
      yesterdayAnswerEl.textContent = yesterdayPuzzle.displayAnswer;
    } else {
      yesterdayAnswerEl.textContent = "—";
    }

    yesterdayBtn.addEventListener("click", () => {
      yesterdayOverlay.classList.remove("hidden");
    });

    yesterdayClose.addEventListener("click", () => {
      yesterdayOverlay.classList.add("hidden");
    });

    yesterdayOverlay.addEventListener("click", (event) => {
      if (event.target === yesterdayOverlay) {
        yesterdayOverlay.classList.add("hidden");
      }
    });

    const instructionsOverlay = document.getElementById("instructionsOverlay");
    const helpBtn = document.getElementById("helpBtn");
    const instructionsClose = document.getElementById("instructionsClose");

    function openInstructions() {
      instructionsOverlay.classList.remove("hidden");
      refitSoon();
    }

    function closeInstructions() {
      instructionsOverlay.classList.add("hidden");
      localStorage.setItem("xobdleInstructionsSeen", "1");
      refitSoon();
    }

    helpBtn.addEventListener("click", openInstructions);
    instructionsClose.addEventListener("click", closeInstructions);

    instructionsOverlay.addEventListener("click", (event) => {
      if (event.target === instructionsOverlay) {
        closeInstructions();
      }
    });

    function formattedDate() {
      const { year, month, day } = getISTDateParts();

      return new Intl.DateTimeFormat("en-AU", {
        day: "numeric",
        month: "short",
        year: "numeric",
        timeZone: "Asia/Kolkata"
      }).format(new Date(Date.UTC(year, month - 1, day, 12, 0, 0)));
    }

    function buildBoard() {
      board.innerHTML = "";

      for (let i = 0; i < MAX_GUESSES * WORD_LENGTH; i++) {
        const tile = document.createElement("div");
        tile.className = "tile";
        tile.dataset.row = Math.floor(i / WORD_LENGTH);
        tile.dataset.col = i % WORD_LENGTH;
        board.appendChild(tile);
      }
    }

    function makeKey(label) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "key";
      button.textContent = label;
      button.dataset.key = label;
      button.addEventListener("click", () => handleKey(label));
      return button;
    }

    function makeActionKey(label, action) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "key action";
      button.textContent = label;
      button.dataset.action = action;

      button.addEventListener("click", () => {
        if (action === "enter") submitGuess();
        if (action === "backspace") backspace();
      });

      return button;
    }

    function buildKeyboard() {
      keyboard.innerHTML = "";

      keyboardRows.forEach((rowKeys, rowIndex) => {
        const row = document.createElement("div");
        row.className = "key-row";

        if (rowIndex === 1) row.classList.add("indent-1");
        if (rowIndex === 2) row.classList.add("indent-2");

        if (rowIndex < 3) {
          rowKeys.forEach(key => row.appendChild(makeKey(key)));
        } else {
          const backspaceKey = makeActionKey("⌫", "backspace");
          backspaceKey.classList.add("backspace-key");
          row.appendChild(backspaceKey);
          rowKeys.forEach(key => row.appendChild(makeKey(key)));
          row.appendChild(makeActionKey("ENTER", "enter"));
        }

        keyboard.appendChild(row);
      });
    }

    function renderBoard() {
      const tiles = [...board.children];

      for (let row = 0; row < MAX_GUESSES; row++) {
        for (let col = 0; col < WORD_LENGTH; col++) {
          const index = row * WORD_LENGTH + col;
          const tile = tiles[index];

          tile.className = "tile";
          tile.textContent = "";

          if (row < guesses.length) {
            tile.textContent = guesses[row][col];
            tile.classList.add(evaluations[row][col]);
          } else if (row === guesses.length) {
            const value = currentGuess[col];

            if (value) {
              tile.textContent = value;
              tile.classList.add("filled");
            }
          }
        }
      }
    }

    function handleKey(key) {
      if (gameOver) return;
      if (currentGuess.length >= WORD_LENGTH) return;

      if (!gameStartedAt) {
        gameStartedAt = Date.now();
        startGameTimer();
      }

      currentGuess.push(key);
      message.textContent = "";
      renderBoard();
      saveTodayState();
      refitSoon();
    }

    function backspace() {
      if (gameOver) return;

      currentGuess.pop();
      message.textContent = "";
      renderBoard();
      saveTodayState();
      refitSoon();
    }

    function evaluateGuess(guess, target) {
      const result = Array(WORD_LENGTH).fill("absent");
      const used = Array(WORD_LENGTH).fill(false);

      for (let i = 0; i < WORD_LENGTH; i++) {
        if (guess[i] === target[i]) {
          result[i] = "correct";
          used[i] = true;
        }
      }

      for (let i = 0; i < WORD_LENGTH; i++) {
        if (result[i] === "correct") continue;

        for (let j = 0; j < WORD_LENGTH; j++) {
          if (!used[j] && guess[i] === target[j]) {
            result[i] = "present";
            used[j] = true;
            break;
          }
        }
      }

      return result;
    }

    function submitGuess() {
      if (gameOver) return;

      if (currentGuess.length !== WORD_LENGTH) {
        message.textContent = "";
        return;
      }

      const guess = [...currentGuess];
      const evaluation = evaluateGuess(guess, answer);

      guesses.push(guess);
      evaluations.push(evaluation);
      currentGuess = [];

      saveTodayState();
      renderBoard();
      updateKeyboardStatuses();

      const won = evaluation.every(status => status === "correct");

      if (won) {
        gameOver = true;
        stopGameTimer();
        message.textContent = "";
        saveTodayState();

        // Let the completed word celebrate, but do not leave the game page.
        window.setTimeout(() => {
          animateWinningRow(guesses.length - 1);
        }, 120);

        // Keep the solved board visible briefly after the jump,
        // then open the result/share screen automatically.
        window.setTimeout(() => {
          showResult();
        }, 3000);

        return;
      }

      if (guesses.length >= MAX_GUESSES) {
        gameOver = true;
        stopGameTimer();
        message.textContent = "";
        saveTodayState();

        // Keep the final failed board visible for 5 seconds,
        // then open the result/share screen automatically.
        setTimeout(showResult, 5000);
      }

      refitSoon();
    }

    function statusRank(status) {
      return {
        absent: 1,
        present: 2,
        correct: 3
      }[status] || 0;
    }

    function updateKeyboardStatuses() {
      const best = {};

      guesses.forEach((guess, rowIndex) => {
        guess.forEach((key, colIndex) => {
          const status = evaluations[rowIndex][colIndex];

          if (!best[key] || statusRank(status) > statusRank(best[key])) {
            best[key] = status;
          }
        });
      });

      keyboard.querySelectorAll(".key[data-key]").forEach(button => {
        button.classList.remove("correct", "present", "absent");

        const status = best[button.dataset.key];

        if (status) {
          button.classList.add(status);
        }
      });
    }
    function animateWinningRow(rowIndex) {
      const tiles = Array.from(
        board.querySelectorAll(`.tile[data-row="${rowIndex}"]`)
      );

      tiles.forEach((tile, index) => {
        window.setTimeout(() => {
          tile.style.transformOrigin = "center center";

          tile.animate(
            [
              { transform: "perspective(500px) rotateX(0deg)" },
              { transform: "perspective(500px) rotateX(90deg)", offset: 0.5 },
              { transform: "perspective(500px) rotateX(0deg)" }
            ],
            {
              duration: 500,
              easing: "ease-in-out"
            }
          );
        }, index * 500);
      });
    }

    function formatElapsed(totalSeconds) {
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;

      return (
        String(minutes).padStart(2, "0") +
        ":" +
        String(seconds).padStart(2, "0")
      );
    }

    function formatElapsedWords(totalSeconds) {
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;

      const secondLabel = seconds === 1 ? "second" : "seconds";

      if (minutes === 0) {
        return seconds + " " + secondLabel;
      }

      const minuteLabel = minutes === 1 ? "minute" : "minutes";

      if (seconds === 0) {
        return minutes + " " + minuteLabel;
      }

      return (
        minutes + " " + minuteLabel +
        " " +
        seconds + " " + secondLabel
      );
    }

    function updateTimerDisplay() {
      if (gameStartedAt && !gameFinishedAt) {
        elapsedSeconds = Math.max(
          0,
          Math.floor((Date.now() - gameStartedAt) / 1000)
        );
      }

      const timer = document.getElementById("gameTimer");
      if (timer) {
        timer.innerHTML = '<span class="timer-emoji">⏳</span><span class="timer-value">' + formatElapsed(elapsedSeconds) + '</span>';
      }
    }

    function startGameTimer() {
      if (!gameStartedAt || timerInterval || gameOver) return;

      updateTimerDisplay();

      timerInterval = window.setInterval(() => {
        updateTimerDisplay();
      }, 1000);
    }

    function stopGameTimer() {
      if (gameFinishedAt) return;

      gameFinishedAt = Date.now();
      elapsedSeconds = gameStartedAt
        ? Math.max(0, Math.floor((gameFinishedAt - gameStartedAt) / 1000))
        : 0;

      if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
      }

      updateTimerDisplay();
    }

    function resultStatusAt(rowIndex, colIndex) {
      if (rowIndex >= evaluations.length) return "empty";
      return evaluations[rowIndex][colIndex];
    }

    function renderResultGrid() {
      const grid = document.getElementById("resultGrid");
      grid.innerHTML = "";

      for (let row = 0; row < MAX_GUESSES; row++) {
        for (let col = 0; col < WORD_LENGTH; col++) {
          const square = document.createElement("div");
          const status = resultStatusAt(row, col);

          square.className = "result-square " + status;
          grid.appendChild(square);
        }
      }
    }

    function showResult() {
      document.getElementById("gamePage").classList.add("hidden");
      document.getElementById("resultPage").classList.remove("hidden");

      document.getElementById("resultDate").textContent = formattedDate();

      const wonGame = guesses.some(
        guess => guess.every((akshara, index) => akshara === answer[index])
      );

      document
        .getElementById("lossResultMessage")
        .classList.toggle("show", !wonGame);

      const resultTime = document.getElementById("resultTime");
      const resultSocial = document.querySelector(".result-social");

      if (wonGame) {
        resultTime.textContent =
          "Done in " + formatElapsedWords(elapsedSeconds) + " today!";
        resultTime.style.display = "";
        resultSocial.style.display = "";
      } else {
        resultTime.textContent = "";
        resultTime.style.display = "none";
        resultSocial.style.display = "none";
      }

      renderResultGrid();

      document.getElementById("shareNote").textContent = "";

      refitSoon();
    }

    function roundRect(ctx, x, y, width, height, radius) {
      const r = Math.min(radius, width / 2, height / 2);

      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + width, y, x + width, y + height, r);
      ctx.arcTo(x + width, y + height, x, y + height, r);
      ctx.arcTo(x, y + height, x, y, r);
      ctx.arcTo(x, y, x + width, y, r);
      ctx.closePath();
    }

    async function createResultPNG() {
      if (document.fonts && document.fonts.ready) {
        await document.fonts.ready;
      }

      const W = resultCanvas.width;
      const H = resultCanvas.height;

      ctx.clearRect(0, 0, W, H);

      ctx.fillStyle = COLORS.background;
      ctx.fillRect(0, 0, W, H);

      const cardX = 90;
      const cardY = 70;
      const cardW = 900;
      const cardH = 1210;

      roundRect(ctx, cardX, cardY, cardW, cardH, 38);
      ctx.fillStyle = COLORS.card;
      ctx.fill();

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Xobdle.in logo: same font, size and baseline; only .in is orange.
      ctx.textAlign = "left";
      ctx.font = '700 92px "Poppins", sans-serif';

      const mainLogoWidth = ctx.measureText("Xobdle").width;
      const suffixWidth = ctx.measureText(".in").width;
      const logoWidth = mainLogoWidth + suffixWidth;
      const logoX = (W - logoWidth) / 2;

      ctx.fillStyle = COLORS.text;
      ctx.fillText("Xobdle", logoX, 205);

      ctx.fillStyle = COLORS.orange;
      ctx.fillText(".in", logoX + mainLogoWidth, 205);

      ctx.textAlign = "center";
      ctx.fillStyle = COLORS.muted;
      ctx.font = '500 32px "Poppins", sans-serif';
      ctx.fillText(formattedDate(), W / 2, 320);

      const tile = 112;
      const gap = 18;
      const gridWidth = tile * 5 + gap * 4;
      const startX = (W - gridWidth) / 2;
      const startY = 420;

      for (let row = 0; row < MAX_GUESSES; row++) {
        for (let col = 0; col < WORD_LENGTH; col++) {
          const status = resultStatusAt(row, col);

          const x = startX + col * (tile + gap);
          const y = startY + row * (tile + gap);

          roundRect(ctx, x, y, tile, tile, 18);

          if (status === "empty") {
            ctx.fillStyle = COLORS.card;
            ctx.fill();

            ctx.lineWidth = 4;
            ctx.strokeStyle = COLORS.emptyBorder;
            ctx.stroke();
          } else {
            const fillMap = {
              correct: COLORS.green,
              present: COLORS.yellow,
              absent: COLORS.gray
            };

            ctx.fillStyle = fillMap[status];
            ctx.fill();
          }
        }
      }

      // Completion time below the result grid.
      ctx.textAlign = "center";
      ctx.fillStyle = COLORS.text;
      ctx.font = '600 34px "Poppins", sans-serif';
      ctx.fillText(
        "Done in " + formatElapsedWords(elapsedSeconds) + " today!",
        W / 2,
        1100
      );

      // Instagram tag prompt below the completion time.
      const socialLead = "Tag us on Instagram · ";
      const socialHandle = "@xobdle";

      ctx.font = '500 27px "Poppins", sans-serif';
      const leadWidth = ctx.measureText(socialLead).width;

      ctx.font = '600 27px "Poppins", sans-serif';
      const handleWidth = ctx.measureText(socialHandle).width;

      const socialWidth = leadWidth + handleWidth;
      const socialX = (W - socialWidth) / 2;
      const socialY = 1160;

      ctx.textAlign = "left";
      ctx.fillStyle = COLORS.muted;
      ctx.font = '500 27px "Poppins", sans-serif';
      ctx.fillText(socialLead, socialX, socialY);

      ctx.fillStyle = COLORS.orange;
      ctx.font = '600 27px "Poppins", sans-serif';
      ctx.fillText(socialHandle, socialX + leadWidth, socialY);

      ctx.textAlign = "center";


      return new Promise(resolve => {
        resultCanvas.toBlob(resolve, "image/png", 1);
      });
    }

    async function sharePNG() {
      const note = document.getElementById("shareNote");
      note.textContent = "";

      const blob = await createResultPNG();

      if (!blob) {
        note.textContent = "Could not create PNG.";
        return;
      }

      const file = new File(
        [blob],
        "xobdle-result.png",
        { type: "image/png" }
      );

      if (
        navigator.share &&
        navigator.canShare &&
        navigator.canShare({ files: [file] })
      ) {
        try {
          await navigator.share({
            files: [file]
          });

          return;
        } catch (error) {
          if (error && error.name === "AbortError") {
            return;
          }
        }
      }

      downloadPNG(blob);
      note.textContent = "Direct image sharing is unavailable here, so the PNG was saved.";
    }

    async function savePNG() {
      const note = document.getElementById("shareNote");
      note.textContent = "";

      const blob = await createResultPNG();

      if (!blob) {
        note.textContent = "Could not create PNG.";
        return;
      }

      downloadPNG(blob);
      note.textContent = "PNG saved.";
    }

    function downloadPNG(blob) {
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = "xobdle-result.png";

      document.body.appendChild(link);
      link.click();
      link.remove();

      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 1000);
    }

    function getViewportSize() {
      const viewport = window.visualViewport;

      return {
        width: viewport ? viewport.width : window.innerWidth,
        height: viewport ? viewport.height : window.innerHeight
      };
    }

    function getActivePage() {
      return document.getElementById("gamePage").classList.contains("hidden")
        ? document.getElementById("resultPage")
        : document.getElementById("gamePage");
    }

    function fitActivePage() {
      const page = getActivePage();

      if (!page) return;

      page.style.transform = "scale(1)";

      const viewport = getViewportSize();

      const naturalWidth = 460;
      const naturalHeight = page.scrollHeight;

      const widthScale = (viewport.width - 8) / naturalWidth;
      const heightScale = (viewport.height - 8) / naturalHeight;

      const scale = Math.min(
        1,
        widthScale,
        heightScale
      );

      page.style.transform = "scale(" + scale + ")";
    }

    function refitSoon() {
      requestAnimationFrame(() => {
        requestAnimationFrame(fitActivePage);
      });
    }

    document.getElementById("gameDate").textContent = formattedDate();

    document.getElementById("shareBtn").addEventListener("click", sharePNG);
    document.getElementById("saveBtn").addEventListener("click", savePNG);
buildBoard();
    buildKeyboard();
    renderBoard();

    const restoredToday = restoreTodayState();

    updateTimerDisplay();

    if (restoredToday && gameStartedAt && !gameOver) {
      startGameTimer();
    }

    if (!localStorage.getItem("xobdleInstructionsSeen")) {
      openInstructions();
    }
    refitSoon();

    window.addEventListener("load", refitSoon);
    window.addEventListener("resize", refitSoon);
    window.addEventListener("orientationchange", refitSoon);

    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", refitSoon);
    }

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(refitSoon);
    }
