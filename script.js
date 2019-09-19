class Stopwatch extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            running: false,
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            },
            watch: null
        }
    }

    reset() {
        this.setState({
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            }
        });
    }

    setZero() {
        this.stop();
        this.reset();
    }

    format() {
        return `${pad0(this.state.times.minutes)}:${pad0(this.state.times.seconds)}:${pad0(Math.floor(this.state.times.miliseconds))}`;
    }

    start() {
        if (!this.state.running) {
            this.setState({ running: true, watch: setInterval(() => this.step(), 10) });
        }
    }

    step() {
        if (!this.state.running) return;
        this.calculate();
    }

    calculate() {
        let times = { ...this.state.times }
        times.miliseconds += 1;
        if (times.miliseconds >= 100) {
            times.seconds += 1;
            times.miliseconds = 0;
        }
        if (times.seconds >= 60) {
            times.minutes += 1;
            times.seconds = 0;
        }
        this.setState({ times })
    }

    stop() {
        this.setState({ running: false });
        clearInterval(this.state.watch);
    }

    render() {
        return (
            <div className={'app'}>
                <nav className={'controls'}>
                    <div className={'btn'}>
                        <a href={"#"} className={'button'} id={'start'} onClick={() => this.start()}>Start</a>
                        <a href={"#"} className={'button'} id={'stop'} onClick={() => this.stop()}>Stop</a>
                        <a href={"#"} className={'button'} id={'reset'} onClick={() => this.reset()}>Reset</a>
                    </div>
                    <div className={'stopwatch'}>
                        {this.format()}
                    </div>
                </nav>
            </div>
        );
    }
}

function pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}

var element = React.createElement(Stopwatch);
ReactDOM.render(element, document.getElementById('app'));