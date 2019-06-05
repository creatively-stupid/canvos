Class Value {
  constructor(type, value) {
    this.t = type;
    this.v = value;
  }
  Values: {
    NULL;   "nul",
    NUMBER; "num",
    STRING; "str",
    
  }
}

Class ValueExpression {
  constructor(expression) {
    this.expr = expression;
    this.expa = new Value()
  }
}

function execute(ast) {

}
