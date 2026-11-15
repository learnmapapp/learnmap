---
title: Channels
icon: "📨"
branch: concurrency
requires: [threads]
summary: Send values from one thread to another.
---
"Don't communicate by sharing memory; share memory by communicating." A channel has a sending end and a receiving end:

```rust
use std::sync::mpsc;
use std::thread;

let (tx, rx) = mpsc::channel();

thread::spawn(move || {
    tx.send("hello from the worker").unwrap();
});

let msg = rx.recv().unwrap(); // waits until a message arrives
println!("{msg}");
```

`mpsc` stands for *multiple producer, single consumer*: clone the sender to have several threads send to the same receiver:

```rust
let (tx, rx) = mpsc::channel();

for id in 0..3 {
    let tx = tx.clone();
    thread::spawn(move || {
        tx.send(id * 10).unwrap();
    });
}
drop(tx); // close our own copy

for value in rx {
    println!("got {value}");
}
```

The receiver works as an iterator, and the loop ends when **all** senders are gone. That's why we `drop(tx)`: otherwise the original sender stays alive and the loop waits forever.

And ownership plays along. Sending a value **moves** it into the channel, so the sender can't touch it anymore:

```rust
let report = String::from("done");
tx.send(report).unwrap();
println!("{report}"); // error: borrow of moved value
```

No two threads can ever use the same data by accident.

```compare go
ch := make(chan string)
go func() { ch <- "hello" }()
msg := <-ch
```

```compare kotlin
val ch = Channel<String>()
launch { ch.send("hello") }
val msg = ch.receive()
```

```compare java
BlockingQueue<String> q = new LinkedBlockingQueue<>();
q.put("hello"); String msg = q.take();
```

```compare python
q = queue.Queue(); q.put("hello"); msg = q.get()
```

```compare javascript
worker.postMessage("hello"); worker.onmessage = (e) => e.data;
```

```quiz
question: When does `for value in rx` stop looping?
options:
  - After the first message.
  - When every Sender has been dropped.
  - Never, you have to break out.
answer: 1
explain: Once no Sender exists, no more messages can arrive, so the iterator ends.
```
