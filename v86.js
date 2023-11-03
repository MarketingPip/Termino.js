var term;
var termfit;
var emulator;

var booted = false;

// Login as root
const username = "root";

// Start a shell on /dev/console for debugging,
// set the TERM variable to a colored terminal,
// fix enter key on some applications
// and resize commands and execute the welcome script
const welcomecmd = 'screen -d -m sh -c "sh </dev/console >/dev/console 2>&1;read";TERM="xterm-256color";stty sane;/etc/init.d/S99welcome';

document.addEventListener("DOMContentLoaded", () => {
    // Show the internal screen if "#debug" is appended to the url
    var v86_display = undefined;
    if(window.location.hash == "#debug") {
        document.getElementById("screen").classList.add("visible");
    }

    // Initialize the v86 emulator
    emulator = new V86Starter({
        wasm_path: "https://cdn.jsdelivr.net/gh/minie4/WebTerm/assets/v86.wasm",
      memory_size: 100 * 1024 * 1024, // 64 MB of memory // 256 MB of memory
      vga_memory_size: 100 * 1024 * 1024,
        screen_container: document.getElementById("screen"),
        bios: {
            url: "https://raw.githubusercontent.com/minie4/WebTerm/master/images/seabios.bin",
        },
        vga_bios: {
            url: "https://raw.githubusercontent.com/minie4/WebTerm/master/images/vgabios.bin",
        },
        cdrom: {
            url: "https://raw.githubusercontent.com/minie4/WebTerm/master/images/os.iso",
        },
        autostart: true,
       filesystem: {},
        
        autostart: true,
 
    });


    termcontainer = document.getElementById('terminal');
    

    // Wait for the emulator to get ready
    emulator.add_listener("emulator-ready", () => {
        emulator.serial0_send("hello")
    })
  
  
  // In this example we wait for output from the serial terminal, which
    // should be running busybox. We log in as soon as a prompt appears and then
    // retrieve a directory listing of the root directory
    var data = "";

    var stages = [
        {
            test: "~% ",
            send: "ls -1 --color=never /\n",
        },
        {
            test: "~% ",
            send: "lua -e 'print(3+4)'\n",
        },
    ];
    var stage = 0;

    emulator.add_listener("serial0-output-byte", function(byte)
    {
        var char = String.fromCharCode(byte);
        if(char === "\r")
        {
            return;
        }

        data += char;
        document.getElementById("terminal").value += char;

        var current = stages[stage];

        if(!current)
        {
            return;
        }

        if(data.endsWith(current.test))
        {
            stage++;
            emulator.serial0_send(current.send);

            var log = "Sending: " + current.send.replace(/\n/g, "\\n") + "\n";
            document.getElementById("log").value += log;
        }
    });
      // Attach a click event to the "Send Input" button
 
  
})



        
           <script src="https://cdn.jsdelivr.net/gh/minie4/WebTerm/assets/libv86.js"></script>
</head>

<textarea readonly rows=25 cols=60 id="log">Waiting for boot ...
</textarea>
//
<textarea readonly rows=25 cols=60 id="terminal"></textarea>

<div id="screen">
    <div style="white-space: pre; font: 14px monospace; line-height: 14px"></div>
    <canvas style="display: none"></canvas>
</div>
