use std::str::Split;

fn main() {
    part_a();
}

fn part_a() {
    // let expected = 70116;

    let input: &str = include_str!("../input/day1.txt");
    let lines: Split<&str> = input.split("\n\n");

    let result: u32 = lines.map(|line: &str| {
        line.split("\n")
        .flat_map(|num: &str| num.parse::<u32>())
        .sum::<u32>()
    }).max()
    .unwrap();

    print!("{:?}", result);  
    // assert!(expected == result);
}

/* fn partB() {
    let expected = 206582;
    let result = 70116;
} */