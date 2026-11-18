import './FinalPage.css'

const PHOTOS = [
  { src: './assets/final-01.png', alt: '' },
  { src: './assets/final-02.png', alt: '' },
  { src: './assets/final-03.png', alt: '' },
  { src: './assets/final-04.png', alt: '' },
  { src: './assets/final-05.png', alt: '' },
]

const MESSAGE = `Opa eaí Rezende tudo suave? Fiquei sabendo que você tá andando com um backup meu na cabeça, foda! Tô animadasso que você finalmente sabe do paranormal.

Eu sei que sumi, que a degus prendeu geral e eu não fiz nada, a verdade é que a degus é uma organização paranormal e por culpa minha e do max, que tá vivo btw, colocamos um alvo nas costa de vcs.

Como você bem sabe, eu era um pen drive, porém algo aconteceu eu me apaixonei! Ela é linda, perfeita e é apaixonada no meu melhor amigo, aí pensei que se eu virasse uma entidade eu teria alguma chance, não tive. Por isso eu sumi, precisei de um tempo pra trabalhar em mim mesmo tá ligado? #mindset #aprimoramentopesoal #amor.

Enfim, to com uma galera foda, mas estamos precisando de um hacker que possa ir fisicamente nos lugares, aí que vc entra. A degus tá com a longuinus, a lança do destino o piá te explica. Vamos invadir aquele lugar, achei que vc ia gostar de ir junto pela vingança e resenha. Vou te mandar a localização via Disc. Mas vem rápido temos só umas semanas até o apocalipse.

Obs: vou te mandar umas fotos da minha amada

Disclaimer: Pedro baskara, Matheus chan, Leozinho olho vivo e Heytor cachorrão, vocês estão legalmente proibidos de falar quem é a pessoa na foto`

export default function FinalPage() {
  return (
    <div className="final-page">
      <div className="final-inner">
        <div className="final-message">
          {MESSAGE.split('\n\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        <div className="final-gallery">
          {PHOTOS.map((photo, i) => (
            <img
              key={i}
              src={photo.src}
              alt={photo.alt}
              className="final-photo"
            />
          ))}
        </div>
      </div>
    </div>
  )
}
