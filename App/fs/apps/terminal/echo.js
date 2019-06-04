
async function Run(argv, stdin, stdout, stderr) {
  stdout.append(argv.v[1]);
  return 0;
}
