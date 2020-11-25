function* a() {
    console.log(">> in generator: ", yield "first");
}

var gen = a();
console.log(">> generator test: ", gen.next());
gen.next("start");