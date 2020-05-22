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
      <div id="container">{tradingCards}</div>
    );
  }
}

ReactDOM.render(
  <TradingCardContainer />,
  document.getElementById('app')
);
