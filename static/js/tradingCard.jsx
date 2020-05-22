const tradingCardData = [
  {
    name: 'Balloonicorn',
    skill: 'video games',
    imgUrl: '/static/img/balloonicorn.jpg'
  },

  {
    name: 'Float',
    skill: 'baking pretzels',
    imgUrl: '/static/img/float.jpg'
  },

  {
    name: 'Llambda',
    skill: 'knitting scarves',
    imgUrl: '/static/img/llambda.jpg'
  }
];

class TradingCard extends React.Component {
  render() {
    return (
      <div className="card">
        <p className="card-name">
          Name: {this.props.name}
        </p>

        <div className="card-img">
          <img src={this.props.imgUrl} />
        </div>

        <p className="card-details">
          Skill: {this.props.skill}
        </p>
      </div>
    );
  }
}

class TradingCardContainer extends React.Component {
  constructor () {
    super();
    this.state = {cards: []}
    this.updateCards = this.updateCards.bind(this);
  }

  getAllCards() {
    $.get('/api/cards', (this.updateCards));
  }

  updateCards(res) {
    const cardList = res.cards;

    this.setState({
      cards: cardList
    });
  }

  componentDidMount() {
    this.getAllCards();
  }
  render() {
    const tradingCards = [];

    for (const currentCard of this.state.cards) {
      tradingCards.push(
        <TradingCard
          key={currentCard.name}
          name={currentCard.name}
          skill={currentCard.skill}
          imgUrl={currentCard.imgUrl}
        />
      );
    }

    return (
      <div>
        <TradingCardForm />
        <div id="container">{tradingCards}</div>
      </div>
    );
  }
}

class TradingCardForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      skill: ''
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSkillChange = this.handleSkillChange.bind(this);
    this.addNewCard = this.addNewCard.bind(this);
  }

  addNewCard() {
    const formData = {
      name: this.state.name,
      skill: this.state.skill
    }
    $.post('/api/cards', formData, () => this.setState({}));
  }

  handleNameChange(e) {
    this.setState({name: e.target.value});
  }

  handleSkillChange(e) {
    this.setState({skill: e.target.value});
  }

  render () {
    return (
      <form>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          value={this.state.name}
          onChange={(this.handleNameChange)}
        />
        <label htmlFor="skill">Skill:</label>
        <input
          id="skill"
          type="text"
          value={this.state.skill}
          onChange={this.handleSkillChange}
        />
        <button onClick={this.addNewCard}>Add</button>
      </form>
    );
  }
}

ReactDOM.render(
  <TradingCardContainer />,
  document.getElementById('app')
);
