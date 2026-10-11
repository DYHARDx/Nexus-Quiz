/**
 * js/questions.js
 * NEXUS QUIZ - Comprehensive Question Bank
 * Each core topic has 20+ questions, extra topics have 10+ questions.
 */
window.NEXUS_QUESTIONS = [
  // ==========================================
  // 1. GENERAL APTITUDE (20 Questions)
  // ==========================================
  {
    id: "apt_1",
    topic: "aptitude",
    difficulty: "easy",
    q: "If a shirt marked at $50 is sold at a 20% discount, what is the selling price?",
    options: ["$30", "$35", "$40", "$45"],
    answer: 2,
    explanation: "Discount = 20% of 50 = $10. Selling price = 50 - 10 = $40."
  },
  {
    id: "apt_2",
    topic: "aptitude",
    difficulty: "medium",
    q: "A train running at 72 km/h crosses a pole in 9 seconds. What is the length of the train?",
    options: ["140 m", "180 m", "200 m", "220 m"],
    answer: 1,
    explanation: "Speed in m/s = 72 * (5/18) = 20 m/s. Length = Speed * Time = 20 * 9 = 180 meters."
  },
  {
    id: "apt_3",
    topic: "aptitude",
    difficulty: "medium",
    q: "A can complete a work in 12 days and B can do it in 24 days. How long will they take working together?",
    options: ["6 days", "8 days", "9 days", "10 days"],
    answer: 1,
    explanation: "Combined rate = 1/12 + 1/24 = 3/24 = 1/8. Time taken = 8 days."
  },
  {
    id: "apt_4",
    topic: "aptitude",
    difficulty: "easy",
    q: "What comes next in the series: 3, 7, 15, 31, 63, ...?",
    options: ["95", "115", "127", "131"],
    answer: 2,
    explanation: "Pattern: (x * 2) + 1. 63 * 2 + 1 = 127."
  },
  {
    id: "apt_5",
    topic: "aptitude",
    difficulty: "hard",
    q: "Two dice are rolled simultaneously. What is the probability that the sum of the numbers is 8?",
    options: ["1/6", "5/36", "1/9", "7/36"],
    answer: 1,
    explanation: "Favorable outcomes for sum 8: (2,6), (3,5), (4,4), (5,3), (6,2) = 5 outcomes. Total = 36. Probability = 5/36."
  },
  {
    id: "apt_6",
    topic: "aptitude",
    difficulty: "medium",
    q: "The ratio of ages of A and B is 4:5. If the sum of their ages is 36, what is B's age?",
    options: ["16 years", "18 years", "20 years", "24 years"],
    answer: 2,
    explanation: "4x + 5x = 36 => 9x = 36 => x = 4. B's age = 5 * 4 = 20 years."
  },
  {
    id: "apt_7",
    topic: "aptitude",
    difficulty: "hard",
    q: "In how many different ways can the letters of the word 'LEADER' be arranged?",
    options: ["720", "360", "180", "120"],
    answer: 1,
    explanation: "'LEADER' has 6 letters with 'E' repeating twice. Total permutations = 6! / 2! = 720 / 2 = 360."
  },
  {
    id: "apt_8",
    topic: "aptitude",
    difficulty: "easy",
    q: "If 15% of a number is 45, what is 40% of that number?",
    options: ["100", "120", "150", "180"],
    answer: 1,
    explanation: "Number = (45 / 15) * 100 = 300. 40% of 300 = 120."
  },
  {
    id: "apt_9",
    topic: "aptitude",
    difficulty: "medium",
    q: "A sum of money doubles itself in 8 years under simple interest. What is the annual interest rate?",
    options: ["10%", "12.5%", "15%", "20%"],
    answer: 1,
    explanation: "SI = Principal => P = P * R * 8 / 100 => R = 100 / 8 = 12.5%."
  },
  {
    id: "apt_10",
    topic: "aptitude",
    difficulty: "easy",
    q: "Find the average of first 5 multiples of 4.",
    options: ["8", "10", "12", "14"],
    answer: 2,
    explanation: "Multiples: 4, 8, 12, 16, 20. Sum = 60. Average = 60 / 5 = 12."
  },
  {
    id: "apt_11",
    topic: "aptitude",
    difficulty: "medium",
    q: "Statement: All cats are animals. All animals have four legs. Conclusion: All cats have four legs.",
    options: ["Definitely True", "Definitely False", "Probably True", "Irrelevant"],
    answer: 0,
    explanation: "Since cats are a subset of animals and all animals have four legs, all cats definitely have four legs."
  },
  {
    id: "apt_12",
    topic: "aptitude",
    difficulty: "hard",
    q: "A man covers a distance at 30 km/h and returns at 20 km/h. What is his average speed for the whole journey?",
    options: ["24 km/h", "25 km/h", "26 km/h", "27 km/h"],
    answer: 0,
    explanation: "Average speed for equal distances = 2xy / (x + y) = 2(30)(20) / (30 + 20) = 1200 / 50 = 24 km/h."
  },
  {
    id: "apt_13",
    topic: "aptitude",
    difficulty: "medium",
    q: "If 'CODING' is written as 'DPEJOH', how is 'NEXUS' written in the same code?",
    options: ["OFYVT", "OFYVT", "OFYVT", "OFYVT"], // typo check below
    options: ["OFYVT", "MFWTR", "OEYVT", "PDYVU"],
    answer: 0,
    explanation: "Each letter is shifted forward by +1: N->O, E->F, X->Y, U->V, S->T. Result: OFYVT."
  },
  {
    id: "apt_14",
    topic: "aptitude",
    difficulty: "easy",
    q: "What is the HCF of 24, 36, and 60?",
    options: ["6", "12", "18", "24"],
    answer: 1,
    explanation: "Factors: 24 (12*2), 36 (12*3), 60 (12*5). Highest Common Factor = 12."
  },
  {
    id: "apt_15",
    topic: "aptitude",
    difficulty: "hard",
    q: "A box contains 5 red balls and 4 blue balls. If 2 balls are drawn at random, what is the probability both are red?",
    options: ["5/18", "5/9", "4/9", "5/12"],
    answer: 0,
    explanation: "Ways to pick 2 red = 5C2 = 10. Total ways to pick 2 = 9C2 = 36. Probability = 10/36 = 5/18."
  },
  {
    id: "apt_16",
    topic: "aptitude",
    difficulty: "medium",
    q: "A cistern can be filled by Pipe A in 4 hours and emptied by Pipe B in 6 hours. If both open, how long to fill?",
    options: ["8 hours", "10 hours", "12 hours", "14 hours"],
    answer: 2,
    explanation: "Net rate = 1/4 - 1/6 = (3 - 2)/12 = 1/12. Time taken = 12 hours."
  },
  {
    id: "apt_17",
    topic: "aptitude",
    difficulty: "easy",
    q: "If 5 workers can build a wall in 10 days, how many days will 10 workers take?",
    options: ["2.5 days", "5 days", "7.5 days", "10 days"],
    answer: 1,
    explanation: "Work = Workers * Days = 5 * 10 = 50 man-days. Days = 50 / 10 = 5 days."
  },
  {
    id: "apt_18",
    topic: "aptitude",
    difficulty: "medium",
    q: "Find the odd one out: 8, 27, 64, 100, 125, 216.",
    options: ["27", "64", "100", "216"],
    answer: 2,
    explanation: "All numbers are perfect cubes (2^3, 3^3, 4^3, 5^3, 6^3) except 100 which is 10^2."
  },
  {
    id: "apt_19",
    topic: "aptitude",
    difficulty: "hard",
    q: "At what angle are the hands of a clock inclined at 3:15?",
    options: ["0°", "7.5°", "12.5°", "15°"],
    answer: 1,
    explanation: "Minute hand at 15 mins = 90°. Hour hand at 3:15 = 3*30 + 15*0.5 = 90 + 7.5 = 97.5°. Angle = 97.5 - 90 = 7.5°."
  },
  {
    id: "apt_20",
    topic: "aptitude",
    difficulty: "easy",
    q: "If the perimeter of a square is 48 cm, what is its area?",
    options: ["96 sq cm", "144 sq cm", "169 sq cm", "196 sq cm"],
    answer: 1,
    explanation: "Side = 48 / 4 = 12 cm. Area = 12 * 12 = 144 sq cm."
  },

  // ==========================================
  // 2. BASIC C PROGRAMMING (20 Questions)
  // ==========================================
  {
    id: "c_1",
    topic: "c_prog",
    difficulty: "easy",
    q: "Which keyword is used to prevent modification of a variable in C?",
    options: ["static", "const", "volatile", "extern"],
    answer: 1,
    explanation: "The 'const' qualifier specifies that a variable's value cannot be modified after initialization."
  },
  {
    id: "c_2",
    topic: "c_prog",
    difficulty: "medium",
    q: "What will be the output of the following C code snippet?",
    code: `#include <stdio.h>\nint main() {\n    int a = 5, b = 2;\n    printf("%.2f", (float)a / b);\n    return 0;\n}`,
    options: ["2.00", "2.50", "2.5", "2"],
    answer: 1,
    explanation: "`(float)a` casts 5 to 5.0f, float division produces 2.5f, and `%.2f` prints it formatted as 2.50."
  },
  {
    id: "c_3",
    topic: "c_prog",
    difficulty: "easy",
    q: "What is the size of `char` data type in standard C?",
    options: ["1 byte", "2 bytes", "4 bytes", "Depends on compiler"],
    answer: 0,
    explanation: "By C standard definition, `sizeof(char)` is always exactly 1 byte."
  },
  {
    id: "c_4",
    topic: "c_prog",
    difficulty: "hard",
    q: "What will be the output of this code snippet?",
    code: `#include <stdio.h>\nint main() {\n    int x = 10;\n    int *p = &x;\n    *p += 5;\n    printf("%d, %d", x, *p);\n    return 0;\n}`,
    options: ["10, 10", "10, 15", "15, 15", "Compilation Error"],
    answer: 2,
    explanation: "`p` holds the address of `x`. Modifying `*p += 5` directly modifies `x` to 15."
  },
  {
    id: "c_5",
    topic: "c_prog",
    difficulty: "medium",
    q: "What is the output of `printf(\"%d\", 5 >> 1);` in C?",
    options: ["10", "2.5", "2", "1"],
    answer: 2,
    explanation: "Right shift `5 (0101 in binary)` by 1 bit yields `2 (0010 in binary)`."
  },
  {
    id: "c_6",
    topic: "c_prog",
    difficulty: "medium",
    q: "Which format specifier is used for printing memory addresses in C?",
    options: ["%d", "%u", "%p", "%x"],
    answer: 2,
    explanation: "The `%p` format specifier is specifically designed for printing pointer addresses."
  },
  {
    id: "c_7",
    topic: "c_prog",
    difficulty: "hard",
    q: "What will be printed by this C loop?",
    code: `#include <stdio.h>\nint main() {\n    int i = 0;\n    while(i++ < 3) {\n        printf("%d ", i);\n    }\n    return 0;\n}`,
    options: ["0 1 2", "1 2 3", "0 1 2 3", "1 2 3 4"],
    answer: 1,
    explanation: "Post-increment evaluates condition with old `i` then increments `i`. Loop prints 1 2 3."
  },
  {
    id: "c_8",
    topic: "c_prog",
    difficulty: "easy",
    q: "Which function is used to dynamically allocate memory in C?",
    options: ["alloc()", "malloc()", "new()", "create()"],
    answer: 1,
    explanation: "`malloc()` allocates specified bytes in heap memory and returns a void pointer."
  },
  {
    id: "c_9",
    topic: "c_prog",
    difficulty: "medium",
    q: "What does the `break` statement do inside a loop in C?",
    options: ["Restarts the loop", "Exits the innermost loop immediately", "Skips current iteration", "Terminates main()"],
    answer: 1,
    explanation: "`break` terminates execution of the innermost enclosing loop or switch statement."
  },
  {
    id: "c_10",
    topic: "c_prog",
    difficulty: "hard",
    q: "What will be the output of the following code?",
    code: `#include <stdio.h>\nint main() {\n    char str[] = "Nexus";\n    printf("%d", sizeof(str));\n    return 0;\n}`,
    options: ["5", "6", "4", "8"],
    answer: 1,
    explanation: "String literals include the implicit null terminator '\\0'. 'Nexus' + '\\0' = 6 bytes."
  },
  {
    id: "c_11",
    topic: "c_prog",
    difficulty: "easy",
    q: "Which operator has the highest precedence in C?",
    options: ["+", "*", "()", "="],
    answer: 2,
    explanation: "Parentheses `()` have the highest precedence in C operator hierarchy."
  },
  {
    id: "c_12",
    topic: "c_prog",
    difficulty: "medium",
    q: "What is a NULL pointer in C?",
    options: ["Pointer pointing to garbage", "Pointer pointing to address 0", "Uninitialized pointer", "Pointer pointing to main()"],
    answer: 1,
    explanation: "A NULL pointer is a pointer initialized to point to memory address 0 (nothing)."
  },
  {
    id: "c_13",
    topic: "c_prog",
    difficulty: "hard",
    q: "What is the output of this code?",
    code: `#include <stdio.h>\nint main() {\n    int a = 10;\n    printf("%d %d %d", a++, a, ++a);\n    return 0;\n}`,
    options: ["10 11 12", "11 12 12", "11 12 11", "Undefined Behavior"],
    answer: 3,
    explanation: "Modifying and reading a variable multiple times in the same `printf` expression causes Undefined Behavior in C."
  },
  {
    id: "c_14",
    topic: "c_prog",
    difficulty: "easy",
    q: "What header file is required to use `strcpy()` in C?",
    options: ["<stdio.h>", "<stdlib.h>", "<string.h>", "<math.h>"],
    answer: 2,
    explanation: "`<string.h>` provides declarations for string manipulation functions like `strcpy()`, `strlen()`, etc."
  },
  {
    id: "c_15",
    topic: "c_prog",
    difficulty: "medium",
    q: "What happens if a recursive function in C lacks a base case?",
    options: ["Returns 0", "Runs once", "Causes Stack Overflow", "Compiler Error"],
    answer: 2,
    explanation: "Without a base condition, infinite call frames are pushed until call stack memory exhausts (Stack Overflow)."
  },
  {
    id: "c_16",
    topic: "c_prog",
    difficulty: "easy",
    q: "What does the `typedef` keyword do in C?",
    options: ["Creates new data types", "Creates aliases for existing types", "Defines global variables", "Allocates memory"],
    answer: 1,
    explanation: "`typedef` gives a new symbolic name or alias to an existing data type."
  },
  {
    id: "c_17",
    topic: "c_prog",
    difficulty: "medium",
    q: "What is the main difference between `structure` and `union` in C?",
    options: ["Structures can hold functions", "Unions share memory location for members", "Structures are faster", "Unions cannot store pointers"],
    answer: 1,
    explanation: "In a union, all members share the same memory location, saving space (size = max member size)."
  },
  {
    id: "c_18",
    topic: "c_prog",
    difficulty: "hard",
    q: "What will be the output?",
    code: `#include <stdio.h>\nint main() {\n    int arr[] = {10, 20, 30};\n    printf("%d", *(arr + 1));\n    return 0;\n}`,
    options: ["10", "20", "30", "Address of arr"],
    answer: 1,
    explanation: "`*(arr + 1)` uses pointer arithmetic to access element at index 1, which is 20."
  },
  {
    id: "c_19",
    topic: "c_prog",
    difficulty: "easy",
    q: "What is the default return type of a function in C if omitted (in C89)?",
    options: ["void", "int", "float", "char"],
    answer: 1,
    explanation: "Historically in C89, functions without explicit return type defaulted to `int`."
  },
  {
    id: "c_20",
    topic: "c_prog",
    difficulty: "medium",
    q: "Which function frees allocated memory in C?",
    options: ["delete()", "free()", "dealloc()", "clear()"],
    answer: 1,
    explanation: "`free(ptr)` releases memory back to the heap."
  },

  // ==========================================
  // 3. COMPUTER FUNDAMENTALS (20 Questions)
  // ==========================================
  {
    id: "cf_1",
    topic: "computer_fund",
    difficulty: "easy",
    q: "Which type of memory is volatile and loses data when power is turned off?",
    options: ["ROM", "RAM", "Hard Disk", "Flash Memory"],
    answer: 1,
    explanation: "RAM (Random Access Memory) is primary volatile memory."
  },
  {
    id: "cf_2",
    topic: "cf_2",
    topic: "computer_fund",
    difficulty: "medium",
    q: "What is the binary equivalent of the decimal number 25?",
    options: ["11001", "11010", "10101", "11100"],
    answer: 0,
    explanation: "25 = 16 + 8 + 1 = (11001) in binary."
  },
  {
    id: "cf_3",
    topic: "computer_fund",
    difficulty: "easy",
    q: "What does CPU stand for?",
    options: ["Central Process Unit", "Central Processing Unit", "Computer Personal Unit", "Control Processing Unit"],
    answer: 1,
    explanation: "CPU stands for Central Processing Unit."
  },
  {
    id: "cf_4",
    topic: "computer_fund",
    difficulty: "medium",
    q: "Which layer of the OSI model is responsible for IP addressing and routing?",
    options: ["Data Link Layer", "Network Layer", "Transport Layer", "Session Layer"],
    answer: 1,
    explanation: "The Network Layer (Layer 3) handles logical IP addressing and packet routing."
  },
  {
    id: "cf_5",
    topic: "computer_fund",
    difficulty: "easy",
    q: "1 Gigabyte (GB) is equal to how many Megabytes (MB)?",
    options: ["1000 MB", "1024 MB", "512 MB", "2048 MB"],
    answer: 1,
    explanation: "1 GB = 1024 MB (2^10 MB)."
  },
  {
    id: "cf_6",
    topic: "computer_fund",
    difficulty: "hard",
    q: "What is the hexadecimal representation of binary 1111 1010?",
    options: ["FA", "FB", "EF", "F10"],
    answer: 0,
    explanation: "1111 = F (15), 1010 = A (10). Result: FA."
  },
  {
    id: "cf_7",
    topic: "computer_fund",
    difficulty: "medium",
    q: "Which operating system scheduling algorithm is non-preemptive?",
    options: ["Round Robin", "First-Come, First-Served (FCFS)", "Shortest Remaining Time First", "Priority (Preemptive)"],
    answer: 1,
    explanation: "FCFS executes processes strictly in order of arrival without preemption."
  },
  {
    id: "cf_8",
    topic: "computer_fund",
    difficulty: "easy",
    q: "Which of the following is an input device?",
    options: ["Monitor", "Printer", "Scanner", "Speaker"],
    answer: 2,
    explanation: "Scanner captures paper documents into digital input data."
  },
  {
    id: "cf_9",
    topic: "computer_fund",
    difficulty: "medium",
    q: "What is the primary function of BIOS in a computer?",
    options: ["Managing database files", "Initializing hardware during boot (POST)", "Providing firewall protection", "Compiling code"],
    answer: 1,
    explanation: "BIOS (Basic Input/Output System) performs POST (Power-On Self-Test) and boots the OS."
  },
  {
    id: "cf_10",
    topic: "computer_fund",
    difficulty: "hard",
    q: "What is virtual memory?",
    options: ["High-speed cache on CPU", "Illusion of larger main memory using disk space", "RAM installed on GPU", "Cloud storage"],
    answer: 1,
    explanation: "Virtual memory uses secondary storage (paging file) to extend physical RAM."
  },
  {
    id: "cf_11",
    topic: "computer_fund",
    difficulty: "easy",
    q: "What is the shortcut key to permanently delete a file in Windows without moving it to Recycle Bin?",
    options: ["Ctrl + Delete", "Shift + Delete", "Alt + Delete", "Tab + Delete"],
    answer: 1,
    explanation: "Shift + Delete permanently deletes selected files in Windows."
  },
  {
    id: "cf_12",
    topic: "computer_fund",
    difficulty: "medium",
    q: "Which protocol is used to securely transfer web pages encrypted over SSL/TLS?",
    options: ["HTTP", "HTTPS", "FTP", "SMTP"],
    answer: 1,
    explanation: "HTTPS (HTTP Secure) uses TLS/SSL encryption over port 443."
  },
  {
    id: "cf_13",
    topic: "computer_fund",
    difficulty: "easy",
    q: "Which component connects the CPU to other components on the motherboard?",
    options: ["Bus", "Port", "Slot", "Socket"],
    answer: 0,
    explanation: "Buses (data bus, address bus, control bus) transport signals across the system."
  },
  {
    id: "cf_14",
    topic: "computer_fund",
    difficulty: "hard",
    q: "What is a deadlock condition in Operating Systems?",
    options: ["When CPU usage hits 100%", "When two processes are waiting indefinitely for resources held by each other", "When memory leaks occur", "When hard drive fails"],
    answer: 1,
    explanation: "Deadlock occurs when processes hold resources while waiting for others in a circular wait cycle."
  },
  {
    id: "cf_15",
    topic: "computer_fund",
    difficulty: "medium",
    q: "What does MAC address stand for in computer networking?",
    options: ["Media Access Control", "Memory Access Code", "Master Account Center", "Machine Access Connection"],
    answer: 0,
    explanation: "MAC (Media Access Control) address is a unique 48-bit physical address of a network interface."
  },
  {
    id: "cf_16",
    topic: "computer_fund",
    difficulty: "easy",
    q: "Which software category does Linux OS belong to?",
    options: ["Proprietary Software", "Open Source Software", "Shareware", "Firmware"],
    answer: 1,
    explanation: "Linux is an open-source operating system distributed under GPL."
  },
  {
    id: "cf_17",
    topic: "computer_fund",
    difficulty: "medium",
    q: "What is cache memory made of?",
    options: ["DRAM", "SRAM", "EEPROM", "Magnetic tape"],
    answer: 1,
    explanation: "SRAM (Static RAM) is faster and used for CPU cache memory."
  },
  {
    id: "cf_18",
    topic: "computer_fund",
    difficulty: "easy",
    q: "Which device connects multiple networks and routes data packets between them?",
    options: ["Switch", "Hub", "Router", "Repeater"],
    answer: 2,
    explanation: "A router operates at Layer 3 to route packets across different networks."
  },
  {
    id: "cf_19",
    topic: "computer_fund",
    difficulty: "hard",
    q: "What is 2's complement of binary 1010?",
    options: ["0101", "0110", "1011", "1100"],
    answer: 1,
    explanation: "1's complement of 1010 = 0101. Add 1: 0001 = 0110."
  },
  {
    id: "cf_20",
    topic: "computer_fund",
    difficulty: "medium",
    q: "Which utility checks and repairs disk filesystem errors in Windows?",
    options: ["ping", "chkdsk", "ipconfig", "netstat"],
    answer: 1,
    explanation: "`chkdsk` scans file systems and disk volumes for logical and physical errors."
  },

  // ==========================================
  // 4. WEB BASICS (20 Questions)
  // ==========================================
  {
    id: "web_1",
    topic: "web_basics",
    difficulty: "easy",
    q: "Which HTML5 tag is used to specify a footer for a document or section?",
    options: ["<bottom>", "<footer>", "<section-end>", "<aside>"],
    answer: 1,
    explanation: "`<footer>` represents a footer section in semantic HTML5."
  },
  {
    id: "web_2",
    topic: "web_basics",
    difficulty: "medium",
    q: "In CSS Box Model, what order does spacing apply from inside out?",
    options: ["Content -> Border -> Padding -> Margin", "Content -> Padding -> Border -> Margin", "Padding -> Content -> Border -> Margin", "Margin -> Border -> Padding -> Content"],
    answer: 1,
    explanation: "The box model order from inside to outside is: Content -> Padding -> Border -> Margin."
  },
  {
    id: "web_3",
    topic: "web_basics",
    difficulty: "easy",
    q: "Which JavaScript keyword declares a block-scoped variable that cannot be re-assigned?",
    options: ["var", "let", "const", "static"],
    answer: 2,
    explanation: "`const` declares block-scoped read-only constants."
  },
  {
    id: "web_4",
    topic: "web_basics",
    difficulty: "medium",
    q: "What HTTP status code represents '200'?",
    options: ["Created", "OK (Success)", "Bad Request", "Not Found"],
    answer: 1,
    explanation: "HTTP 200 OK indicates a successful request."
  },
  {
    id: "web_5",
    topic: "web_basics",
    difficulty: "easy",
    q: "How do you select an element with `id=\"header\"` in CSS?",
    options: [".header", "#header", "*header", "header[]"],
    answer: 1,
    explanation: "The `#` symbol selects elements by ID in CSS."
  },
  {
    id: "web_6",
    topic: "web_basics",
    difficulty: "hard",
    q: "What will `console.log(typeof null)` output in JavaScript?",
    options: ["null", "undefined", "object", "boolean"],
    answer: 2,
    explanation: "Due to a historical bug in JavaScript, `typeof null` evaluates to `'object'`."
  },
  {
    id: "web_7",
    topic: "web_basics",
    difficulty: "medium",
    q: "Which CSS property is used to center flex items along the cross axis?",
    options: ["justify-content", "align-items", "flex-direction", "align-content"],
    answer: 1,
    explanation: "`align-items` aligns flex items along the cross axis (perpendicular to main axis)."
  },
  {
    id: "web_8",
    topic: "web_basics",
    difficulty: "easy",
    q: "Which HTML attribute opens a link in a new browser tab?",
    options: ["target=\"_blank\"", "target=\"_self\"", "rel=\"new\"", "open=\"tab\""],
    answer: 0,
    explanation: "`target=\"_blank\"` tells the browser to open the target document in a new window/tab."
  },
  {
    id: "web_9",
    topic: "web_basics",
    difficulty: "hard",
    q: "What is the output of `'5' + 3 - 2` in JavaScript?",
    options: ["51", "6", "5", "NaN"],
    answer: 0,
    explanation: "'5' + 3 results in string '53' due to coercion. Then '53' - 2 converts to number subtraction = 51."
  },
  {
    id: "web_10",
    topic: "web_basics",
    difficulty: "medium",
    q: "Which CSS unit is relative to the root element's (`<html>`) font size?",
    options: ["em", "rem", "vh", "%"],
    answer: 1,
    explanation: "`rem` stands for Root EM and is relative to the root font size."
  },
  {
    id: "web_11",
    topic: "web_basics",
    difficulty: "easy",
    q: "What tag is used to embed JavaScript code in an HTML file?",
    options: ["<js>", "<script>", "<javascript>", "<code_js>"],
    answer: 1,
    explanation: "The `<script>` tag embeds executable client-side JavaScript."
  },
  {
    id: "web_12",
    topic: "web_basics",
    difficulty: "medium",
    q: "What is the purpose of the `alt` attribute on an `<img>` tag?",
    options: ["Alternative text for accessibility & broken images", "Title tooltip on hover", "High resolution URL", "Alignment style"],
    answer: 0,
    explanation: "`alt` provides descriptive text for screen readers and when images fail to load."
  },
  {
    id: "web_13",
    topic: "web_basics",
    difficulty: "hard",
    q: "What is the Event Loop in JavaScript?",
    options: ["A loop for iterating over arrays", "Mechanism that handles asynchronous callbacks by pushing them from queue to stack", "CSS animation cycle", "HTML parser thread"],
    answer: 1,
    explanation: "The Event Loop continuously checks the call stack and moves tasks from callback/microtask queues when empty."
  },
  {
    id: "web_14",
    topic: "web_basics",
    difficulty: "easy",
    q: "Which meta tag ensures proper responsive scaling on mobile devices?",
    options: ["<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">", "<meta name=\"mobile\" content=\"true\">", "<meta name=\"scale\" content=\"responsive\">", "<meta name=\"screen\" content=\"adapt\">"],
    answer: 0,
    explanation: "The viewport meta tag configures mobile screen scaling."
  },
  {
    id: "web_15",
    topic: "web_basics",
    difficulty: "medium",
    q: "Which HTTP request method is idempotent and used to update a resource?",
    options: ["POST", "PUT", "DELETE", "GET"],
    answer: 1,
    explanation: "PUT is designed to update/replace resources idempotently."
  },
  {
    id: "web_16",
    topic: "web_basics",
    difficulty: "easy",
    q: "What does DOM stand for in Web Development?",
    options: ["Document Object Model", "Data Object Mode", "Digital Operations Management", "Desktop Object Marker"],
    answer: 0,
    explanation: "DOM stands for Document Object Model."
  },
  {
    id: "web_17",
    topic: "web_basics",
    difficulty: "medium",
    q: "How do you apply a blur backdrop filter in CSS?",
    options: ["filter: blur(10px);", "backdrop-filter: blur(10px);", "background-blur: 10px;", "glass-effect: blur;"],
    answer: 1,
    explanation: "`backdrop-filter: blur(10px)` applies graphical effects to the area behind an element."
  },
  {
    id: "web_18",
    topic: "web_basics",
    difficulty: "hard",
    q: "What is the difference between `localStorage` and `sessionStorage`?",
    options: ["localStorage has 1KB limit", "sessionStorage persists across browser closes", "sessionStorage clears when tab/session closes", "localStorage only stores numbers"],
    answer: 2,
    explanation: "`sessionStorage` data is cleared when the tab closes, whereas `localStorage` persists until cleared."
  },
  {
    id: "web_19",
    topic: "web_basics",
    difficulty: "easy",
    q: "Which CSS display property turns an element into a flex container?",
    options: ["display: block;", "display: grid;", "display: flex;", "display: inline-block;"],
    answer: 2,
    explanation: "`display: flex` establishes a flex formatting context."
  },
  {
    id: "web_20",
    topic: "web_basics",
    difficulty: "medium",
    q: "What is CORS in web architecture?",
    options: ["Cross-Origin Resource Sharing", "Central Online Rendering System", "Client Object Request Standard", "Core Output Routing Server"],
    answer: 0,
    explanation: "CORS (Cross-Origin Resource Sharing) is a browser security mechanism restricting cross-origin HTTP requests."
  },

  // ==========================================
  // 5. EXTRA TOPICS (10+ Questions Each)
  // ==========================================

  // --- DSA BASICS (10 Questions) ---
  {
    id: "dsa_1",
    topic: "dsa",
    difficulty: "easy",
    q: "What is the worst-case time complexity of accessing an element in an Array by index?",
    options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
    answer: 0,
    explanation: "Arrays allow random direct access by index in O(1) constant time."
  },
  {
    id: "dsa_2",
    topic: "dsa",
    difficulty: "medium",
    q: "Which data structure operates on a Last-In, First-Out (LIFO) principle?",
    options: ["Queue", "Stack", "Tree", "Graph"],
    answer: 1,
    explanation: "Stack operates on LIFO (Last-In First-Out)."
  },
  {
    id: "dsa_3",
    topic: "dsa",
    difficulty: "medium",
    q: "What is the average time complexity of Quick Sort?",
    options: ["O(n)", "O(n log n)", "O(n^2)", "O(log n)"],
    answer: 1,
    explanation: "Quick Sort achieves O(n log n) average time complexity."
  },
  {
    id: "dsa_4",
    topic: "dsa",
    difficulty: "easy",
    q: "Which data structure uses pointers/references to connect node elements?",
    options: ["Array", "Linked List", "Matrix", "Heap Array"],
    answer: 1,
    explanation: "Linked lists consist of nodes containing data and pointers to the next node."
  },
  {
    id: "dsa_5",
    topic: "dsa",
    difficulty: "hard",
    q: "Which traversal technique visits Binary Search Tree nodes in sorted ascending order?",
    options: ["Pre-order", "In-order", "Post-order", "Level-order"],
    answer: 1,
    explanation: "In-order traversal (Left -> Root -> Right) visits BST nodes in sorted ascending sequence."
  },
  {
    id: "dsa_6",
    topic: "dsa",
    difficulty: "medium",
    q: "What algorithm is used to find the shortest path in a weighted graph without negative edges?",
    options: ["Kruskal's Algorithm", "Dijkstra's Algorithm", "Prim's Algorithm", "Floyd-Warshall"],
    answer: 1,
    explanation: "Dijkstra's algorithm computes shortest paths from a single source in non-negatively weighted graphs."
  },
  {
    id: "dsa_7",
    topic: "dsa",
    difficulty: "easy",
    q: "A Queue operates under which principle?",
    options: ["LIFO", "FIFO", "FILO", "Random"],
    answer: 1,
    explanation: "Queue operates under FIFO (First-In, First-Out)."
  },
  {
    id: "dsa_8",
    topic: "dsa",
    difficulty: "hard",
    q: "What condition occurs when a hash function maps two distinct keys to the same table index?",
    options: ["Overflow", "Collision", "Deadlock", "Underflow"],
    answer: 1,
    explanation: "A Hash Collision occurs when different keys produce identical hash values."
  },
  {
    id: "dsa_9",
    topic: "dsa",
    difficulty: "medium",
    q: "What is the time complexity of Binary Search on a sorted array of size n?",
    options: ["O(n)", "O(log n)", "O(1)", "O(n log n)"],
    answer: 1,
    explanation: "Binary Search halves the search space each step, giving O(log n) time complexity."
  },
  {
    id: "dsa_10",
    topic: "dsa",
    difficulty: "easy",
    q: "Which data structure is typically used for Breadth-First Search (BFS) in graphs?",
    options: ["Stack", "Queue", "Heap", "Tree"],
    answer: 1,
    explanation: "BFS uses a Queue to explore graph nodes level by level."
  },

  // --- DBMS (10 Questions) ---
  {
    id: "dbms_1",
    topic: "dbms",
    difficulty: "easy",
    q: "What does SQL stand for?",
    options: ["Structured Query Language", "Sequential Query List", "Simple Question Language", "System Query Logic"],
    answer: 0,
    explanation: "SQL stands for Structured Query Language."
  },
  {
    id: "dbms_2",
    topic: "dbms",
    difficulty: "medium",
    q: "In ACID properties of transactions, what does 'A' stand for?",
    options: ["Availability", "Atomicity", "Accuracy", "Authentication"],
    answer: 1,
    explanation: "Atomicity ensures that a transaction completes entirely or not at all ('all or nothing')."
  },
  {
    id: "dbms_3",
    topic: "dbms",
    difficulty: "easy",
    q: "Which SQL command is used to remove a table along with its structure permanently?",
    options: ["DELETE TABLE", "DROP TABLE", "REMOVE TABLE", "TRUNCATE TABLE"],
    answer: 1,
    explanation: "`DROP TABLE` removes both data rows and table schema definition."
  },
  {
    id: "dbms_4",
    topic: "dbms",
    difficulty: "medium",
    q: "What key uniquely identifies each row in a database table?",
    options: ["Foreign Key", "Primary Key", "Candidate Key", "Super Key"],
    answer: 1,
    explanation: "A Primary Key uniquely identifies each record in a database table."
  },
  {
    id: "dbms_5",
    topic: "dbms",
    difficulty: "hard",
    q: "Which Normal Form eliminates transitive dependencies?",
    options: ["1NF", "2NF", "3NF", "BCNF"],
    answer: 2,
    explanation: "Third Normal Form (3NF) requires a relation to be in 2NF and have no transitive functional dependencies."
  },
  {
    id: "dbms_6",
    topic: "dbms",
    difficulty: "medium",
    q: "Which clause is used to filter aggregated data in SQL?",
    options: ["WHERE", "HAVING", "GROUP BY", "ORDER BY"],
    answer: 1,
    explanation: "`HAVING` filters results after `GROUP BY` aggregations (whereas `WHERE` filters rows before grouping)."
  },
  {
    id: "dbms_7",
    topic: "dbms",
    difficulty: "easy",
    q: "What type of join returns all rows when there is a match in either left or right table?",
    options: ["INNER JOIN", "FULL OUTER JOIN", "LEFT JOIN", "RIGHT JOIN"],
    answer: 1,
    explanation: "FULL OUTER JOIN returns all matching and non-matching records from both tables."
  },
  {
    id: "dbms_8",
    topic: "dbms",
    difficulty: "hard",
    q: "What is a Foreign Key constraint in RDBMS?",
    options: ["Key for encryption", "Field referencing the Primary Key of another table", "Secondary index for speed", "Virtual calculated column"],
    answer: 1,
    explanation: "A Foreign Key establishes referential integrity between tables by linking to a Primary Key."
  },
  {
    id: "dbms_9",
    topic: "dbms",
    difficulty: "medium",
    q: "Which command is used to modify existing records in a table?",
    options: ["ALTER", "UPDATE", "MODIFY", "CHANGE"],
    answer: 1,
    explanation: "`UPDATE table SET col = val WHERE condition` modifies existing rows."
  },
  {
    id: "dbms_10",
    topic: "dbms",
    difficulty: "easy",
    q: "What does ER diagram stand for?",
    options: ["Entity Relationship Diagram", "Execution Run Diagram", "Enterprise Resource Diagram", "Extended Routing Diagram"],
    answer: 0,
    explanation: "ER diagram stands for Entity Relationship Diagram."
  },

  // --- OPERATING SYSTEMS (10 Questions) ---
  {
    id: "os_1",
    topic: "os",
    difficulty: "easy",
    q: "What is the core component of an Operating System that manages hardware resources?",
    options: ["Shell", "Kernel", "GUI", "Compiler"],
    answer: 1,
    explanation: "The Kernel is the central core of an OS managing CPU, memory, and hardware."
  },
  {
    id: "os_2",
    topic: "os",
    difficulty: "medium",
    q: "What state transition happens when a process in the Running state requests I/O?",
    options: ["Running -> Ready", "Running -> Blocked/Waiting", "Running -> Terminated", "Ready -> Running"],
    answer: 1,
    explanation: "When a running process requests I/O, it enters the Blocked/Waiting state until I/O finishes."
  },
  {
    id: "os_3",
    topic: "os",
    difficulty: "hard",
    q: "What memory management technique divides physical memory into fixed-size blocks called frames?",
    options: ["Segmentation", "Paging", "Swapping", "Fragmentation"],
    answer: 1,
    explanation: "Paging divides physical memory into fixed-size frames and logical memory into pages."
  },
  {
    id: "os_4",
    topic: "os",
    difficulty: "medium",
    q: "What mechanism is used by a process to request a service from the OS Kernel?",
    options: ["API call", "System Call", "Interrupt Vector", "Thread Spawn"],
    answer: 1,
    explanation: "System Calls provide an interface between user applications and Kernel services."
  },
  {
    id: "os_5",
    topic: "os",
    difficulty: "easy",
    q: "What is a lightweight process called?",
    options: ["Task", "Thread", "Daemon", "Signal"],
    answer: 1,
    explanation: "A Thread is a lightweight unit of execution within a process."
  },
  {
    id: "os_6",
    topic: "os",
    difficulty: "medium",
    q: "What is Belady's Anomaly in Operating Systems?",
    options: ["CPU utilization drops", "Page fault rate increases as number of allocated frames increases", "Disk crash condition", "Thread deadlock"],
    answer: 1,
    explanation: "Belady's Anomaly occurs in FIFO page replacement where adding frames increases page faults."
  },
  {
    id: "os_7",
    topic: "os",
    difficulty: "hard",
    q: "Which algorithm is used for Deadlock Avoidance in OS?",
    options: ["Banker's Algorithm", "Round Robin", "SJF Algorithm", "Elevator Algorithm"],
    answer: 0,
    explanation: "Banker's Algorithm checks resource allocation state to guarantee safe execution avoiding deadlocks."
  },
  {
    id: "os_8",
    topic: "os",
    difficulty: "easy",
    q: "What condition causes Thrashing in an Operating System?",
    options: ["Excessive CPU clock frequency", "High page fault rate where OS spends more time swapping pages than executing", "Network buffer overflow", "Power failure"],
    answer: 1,
    explanation: "Thrashing happens when processes lack enough pages, causing continuous high page fault swapping."
  },
  {
    id: "os_9",
    topic: "os",
    difficulty: "medium",
    q: "What is a Semaphore in IPC (Inter-Process Communication)?",
    options: ["Storage array", "Integer variable used for process synchronization", "Hardware port", "Graphic buffer"],
    answer: 1,
    explanation: "A Semaphore is a synchronization variable used to control concurrent access to shared resources."
  },
  {
    id: "os_10",
    topic: "os",
    difficulty: "easy",
    q: "Which command in UNIX displays active running processes?",
    options: ["ls", "ps", "top", "dir"],
    answer: 1,
    explanation: "`ps` (process status) lists running processes in UNIX/Linux systems."
  },

  // --- VERBAL ENGLISH (10 Questions) ---
  {
    id: "verb_1",
    topic: "verbal",
    difficulty: "easy",
    q: "Choose the correct synonym for 'CANDID':",
    options: ["Secretive", "Frank / Honest", "Deceitful", "Shy"],
    answer: 1,
    explanation: "'Candid' means truthful, straightforward, or frank."
  },
  {
    id: "verb_2",
    topic: "verbal",
    difficulty: "medium",
    q: "Choose the correct antonym for 'METICULOUS':",
    options: ["Careful", "Diligent", "Careless", "Thorough"],
    answer: 2,
    explanation: "'Meticulous' means very careful and precise; its antonym is 'Careless'."
  },
  {
    id: "verb_3",
    topic: "verbal",
    difficulty: "easy",
    q: "Fill in the blank: She has been working here _____ 2018.",
    options: ["for", "since", "from", "during"],
    answer: 1,
    explanation: "'Since' is used to denote a specific starting point in time."
  },
  {
    id: "verb_4",
    topic: "verbal",
    difficulty: "medium",
    q: "Identify the correctly spelled word:",
    options: ["Accommodate", "Acomodate", "Accomodate", "Acommodate"],
    answer: 0,
    explanation: "'Accommodate' is spelled with double 'c' and double 'm'."
  },
  {
    id: "verb_5",
    topic: "verbal",
    difficulty: "hard",
    q: "What is the meaning of the idiom 'To burn the midnight oil'?",
    options: ["To waste resources", "To work or study late into the night", "To cause an accident", "To retire early"],
    answer: 1,
    explanation: "'To burn the midnight oil' means studying or working late into the night."
  },
  {
    id: "verb_6",
    topic: "verbal",
    difficulty: "easy",
    q: "Find the error in the sentence: 'Neither of the two candidates have submitted their resume.'",
    options: ["Neither of", "the two candidates", "have submitted", "their resume"],
    answer: 2,
    explanation: "'Neither' is singular and takes a singular verb: 'has submitted'."
  },
  {
    id: "verb_7",
    topic: "verbal",
    difficulty: "medium",
    q: "Select the sentence with correct passive voice for: 'The manager signed the document.'",
    options: ["The document was signed by the manager.", "The document has signed by the manager.", "The manager was signing document.", "The document signed the manager."],
    answer: 0,
    explanation: "Passive voice of Simple Past ('signed') uses 'was/were + past participle' -> 'was signed'."
  },
  {
    id: "verb_8",
    topic: "verbal",
    difficulty: "hard",
    q: "Choose the correct word to complete: 'His speech had a profound _____ on the audience.'",
    options: ["affect", "effect", "effective", "affection"],
    answer: 1,
    explanation: "'Effect' is a noun meaning result or impact. ('Affect' is usually a verb)."
  },
  {
    id: "verb_9",
    topic: "verbal",
    difficulty: "medium",
    q: "Choose the word closest in meaning to 'PRAGMATIC':",
    options: ["Idealistic", "Practical", "Theoretical", "Emotional"],
    answer: 1,
    explanation: "'Pragmatic' means dealing with things sensibly and realistically (practical)."
  },
  {
    id: "verb_10",
    topic: "verbal",
    difficulty: "easy",
    q: "Fill in the blank: Neither John nor his friends _____ attending the party tonight.",
    options: ["is", "are", "was", "has"],
    answer: 1,
    explanation: "When subjects are joined by 'neither...nor', the verb agrees with the closer subject ('friends' -> plural 'are')."
  }
];

window.NEXUS_TOPICS = {
  aptitude: {
    id: "aptitude",
    name: "General Aptitude",
    icon: "🧠",
    desc: "Percentages, ratios, time & work, probability, number series & logic.",
    isCore: true,
    timePerQ: 45
  },
  c_prog: {
    id: "c_prog",
    name: "Basic C Programming",
    icon: "⚡",
    desc: "Pointers, arrays, loops, operators, functions & output snippets.",
    isCore: true,
    timePerQ: 45
  },
  computer_fund: {
    id: "computer_fund",
    name: "Computer Fundamentals",
    icon: "💻",
    desc: "Hardware, memory hierarchy, OS concepts, networking & shortcuts.",
    isCore: true,
    timePerQ: 45
  },
  web_basics: {
    id: "web_basics",
    name: "Web Basics",
    icon: "🌐",
    desc: "HTML5 tags, CSS box model/flexbox, JS basics & HTTP status codes.",
    isCore: true,
    timePerQ: 45
  },
  dsa: {
    id: "dsa",
    name: "DSA Basics",
    icon: "🌳",
    desc: "Stacks, Queues, Trees, Graphs, Sorting & Time Complexities.",
    isCore: false,
    timePerQ: 45
  },
  dbms: {
    id: "dbms",
    name: "DBMS",
    icon: "🗄️",
    desc: "SQL queries, Normalization, ACID properties & Keys.",
    isCore: false,
    timePerQ: 45
  },
  os: {
    id: "os",
    name: "Operating Systems",
    icon: "⚙️",
    desc: "Kernel, Scheduling, Paging, Virtual Memory & Deadlocks.",
    isCore: false,
    timePerQ: 45
  },
  verbal: {
    id: "verbal",
    name: "Verbal English",
    icon: "📚",
    desc: "Synonyms, Antonyms, Grammar rules, Idioms & Spotting Errors.",
    isCore: false,
    timePerQ: 45
  }
};
