(()=>{
    'use strict'
    let deck = [];
    const tipos = ['C','D','H','S'];
    const especiales = ['A','J','Q','K'];

    let puntosJugador = 0,
        puntosComputadora = 0;

    // Referencias del html

    const btnPedir = document.querySelector('#btnPedir')
    const btnDetener = document.querySelector('#btnDetener')
    const btnNuevo = document.querySelector('#btnNuevo')
    const numerador = document.querySelectorAll('small')
    const divCartasJugador = document.querySelector('#jugador-cartas')
    const divCartasComputadora = document.querySelector('#computadora-cartas')

    const crearDeck = ()=> {

        for(let i = 2; i <= 10; i++){
            for(let tipo of tipos){
                deck.push(i + tipo)
            }
        }
        
        for(let tipo of tipos){
            for(let esp of especiales){
                deck.push(esp + tipo)
            }
        }

        deck = _.shuffle( deck )
        return deck
    }

    crearDeck()

    // Esta funcion me permite tomar una carta
    const pedirCarta = () => {

        if (deck.length === 0){
            throw 'No hay cartas en el deck'
        }
        const carta = deck.pop()
        return carta
    }

    // pedirCarta()
    const valorCarta = (carta)=> {
        const valor = carta.substring(0, carta.length - 1);
        return(isNaN(valor)) ?
            (valor === 'A') ? 11 :10
            : valor * 1
    }

    // Turno de la computadora
    const turnoComputadora = ( puntosMinimos ) =>{

        do{
            const carta = pedirCarta();
            puntosComputadora = puntosComputadora + valorCarta(carta)
            
            numerador[1].innerText = puntosComputadora
            
            const imgCarta = document.createElement('img')
            imgCarta.src = `assets/cartas/${ carta }.png`
            imgCarta.classList.add('cartas')
            divCartasComputadora.append(imgCarta)

            if (puntosMinimos > 21){
                break;
            }

        } while( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21) );

        setTimeout(() => {
            if( puntosComputadora === puntosMinimos ){
                alert('Nadie Gana')
            } else if ((puntosComputadora <= 21) && (puntosMinimos < puntosComputadora) || (puntosMinimos > 21)){
                alert('La computadora gana')
            } else if (puntosComputadora > 21){
                alert('El jugador gana')
            }
        }, 10);
    }

    // Eventos
    btnPedir.addEventListener('click', ()=>{
        const carta = pedirCarta();
        puntosJugador = puntosJugador + valorCarta(carta)
        
        numerador[0].innerText = puntosJugador
        
        const imgCarta = document.createElement('img')
        imgCarta.src = `assets/cartas/${ carta }.png`
        imgCarta.classList.add('cartas')
        divCartasJugador.append(imgCarta)

        if(puntosJugador > 21){
            btnDetener.disabled = true;
            btnPedir.disabled = true;
            turnoComputadora( puntosJugador );
        } else if (puntosJugador === 21){
            btnDetener.disabled = true;
            btnPedir.disabled = true;
            turnoComputadora( puntosJugador );
        }
    })

    btnDetener.addEventListener('click', ()=>{
        turnoComputadora( puntosJugador );
        btnDetener.disabled = true;
        btnPedir.disabled = true;
    })


    btnNuevo.addEventListener('click', ()=>{
        btnDetener.disabled = false;
        btnPedir.disabled = false;
        puntosJugador = 0;
        puntosComputadora = 0;
        numerador[0].innerText = 0;
        numerador[1].innerText = 0;
        divCartasJugador.innerHTML = '';
        divCartasComputadora.innerHTML = '';
        crearDeck();
    })
})();
