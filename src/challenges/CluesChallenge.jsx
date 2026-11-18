import { useState } from 'react'
import { validateAnswer } from '../services/validation.js'
import './CluesChallenge.css'

const CODE_BLOCK = '2mlc6c21cx3h5o9ss94fsqzrvuoba5hz9x8rv37rtn12j9a8y0ujr07w5mtn4buoo27v751s8vwlbpxkj6dbzg0dcuehgr2x4k5vj8612mmanc976tjpl99v5z4voq9sex4ajb66uu58nd12ux11l7y71z39nvpbr66qmbvb6nrgp4fog2j1vq11fyh8h3p6vh9timlqq23qbyiwmqrps9dn9v9d743jd5u7wrut294ybgma68gtp4c4rhlz4co83wobgi27lllsch24y0i7vpdk4qngc6ncxtuenih89c1zo6gdcndsszhluxz78d5h7p1js6gdvx9oftdu27a9tqa2scmrvqxp52lqoqun0yycvfjefr4hojp8beouhsoymz2hmuge8777cf5i76l8zyjff3pwwx6zfqs420bc3a6i1dvp4pvsnqkbdy3mhbloj4c1darq2l28u94b1a1qlr2b3wtrryi7xhblypq181svmud1yjyz7cz1hmwnavt3oqua1sofu4saox1lncvftwhrvy42rek4grkawiiwfutf8lretylyzvyixs9gm53eyt4jyg5sffd17wtlpp1wsixnc2woytgwyau08e489cjdpc5piwdhi7ma91dqsohahnqzs4dkbz1i5owrcwjszi02ckpn3gh03ug19s96xy403ter1rcotai7h1kzvf5u8gpvh6dq29b0jylarchknzl5c0z4ka0dkq1kkvrvh7ymvuh1qpdvlbz6c5liajky3pyf1nivyaxi3zhrdiq7jy4k5ndleji0hmkm48nr03mpx8d3c5dlx6uunocm461ow0pyepuwzd1lag4qc349mdqi7qr9qzdh1j8colsxvmfmw6lq432nh1amy79pm64hgnkk8s8m7nfcc5l4tegxlr7opge0tt9y6htwxf6lkmdc98lg0azcm6klxsu4qpq4jcfffr34j9f230kwaaaq2zs2sc81qjv2si3q71xllo59iyaytpfr2efcrdr94ey1sci043ex6kxt7b6ctxl3ktepxnsyov2u5s70namkr2t4nh831m966febs5riu5vue50ws4feetpt2omllop3s1eipx9nnpv4mlzuz43icu2d5wtmwiemzwwmfm6m43kv7qwnivve8sqok1355x94l7n1o7n5gzzjuuvqyh135osh8pht882hsj559xs5uek0xs4heiza3fd6sqotjg5uhsuap2ph4ulxufs8hyqpf1flvsu2jjnj0hvgl6hueb41c42c4033eqh4r6w54smus4z8h9vixbeab3sun7u9mg4gq35dufw2tasxxsj2zv7ubik8amxv36ejjm5uqz3s32t73mwr01cpq1pukarrdoknpel3pgeuu5yze5k2b16kmxv35d3mr4br7ams9hml037slwin6benomucxjd1olifl2qcts7lp0iprp7rm84c37enk6hj5dt71d1th79vzkotcn0oitdmow1k50vucy9w9gc3hyephvcnxx1e3mht6qqcv2pfxctc21a0ec42w346t46v6ll74syvglu4vbi8v74wfv9omzu9s21cmk5zu0kobmmn9iejqtrkf6d3g02ky2g3z8nd2u588gf1c8w4o7b2pdivybk38qnufufb9doj83rk91lkg2lih5g9hs1wcf51sibomlp6rr2c2y31vtirwv1eptzonhupfh5me281dm0txq0d5mpcsxkvfd89oxtrmjanjvc3nursprzrnjc46c76mug1njgbhhouurystsf54h2l4df2vd9hmowxsxq5vcxl5gxflrjxpm0kh4qy7jupzqbr3ap82ggu7uic116gurcvdqk1hdkgq9o0mbyy850pv6ym12q18xxsdiu42ws4yi1mu4j0p6gtr8cehjf4r1lod2u57gqyrf0hygasl16ettxenqna9kjr3w5wkb3982xdyjgvs0snw42cc75vgp63jl1s7m3fdrhl2i02xha2od10cwz6rwbf1tkkslwr3ir8060uzau2zja20etqjtr56m2zokvjecuzo9m9937hnma8ooz3uugbm20s5oqrmixmugzg0z08a50hzr8amerbbovzpyaqc2jy47msfefxif015bll2ewa02tgaqifae29gjxj3c4r3oy8w05zb8obpr92n70djifgv7u28i533z9ogie3pemc6ivtuid9hoafj3zttc24cnffy95vgmiwgudct312dw5yzbfxg9sfx2fnxujwwo3a6czmy1japcvct8tg3v6dgmkhj7t89iw3z9cgzkvtpbhea6d0ramqpjtn7otjqguq90glbf7xcc645ikuyva8s9s1jfp49yu5cuu12oveypsvxkgh3nje61a5r6kf2jx8xext16aoh50ekwvhv56fp8ixaas8tj7fzsof9icdm9yey1314gm4191ryt9brhh46w69xa1elrx7sbs8wldngbbkm67sesgq8468cggt9rvpo78f0sayfv1hzeqz6qqsxypmg18un9oc2qjqjdpslvvymsxgbzei2qbc57eda2y4hft42cahxtcd53xl5wtw7815phr4i6fpbqoaed80eip9pbuv0wx1lbsffzb05aa3y1h9vr7xzlsuw8944o7iyelexsq059t97egs3y4w01xq0hz0rc3o3wx6n3hnn4aimitmke2tfj5tb1h00x2e3imeo7epc8t2066ash5sxry006pyuit4yvy60yvupltteeq2tn6eiw212zasdymlfhq2s7au6w9nlzb6msqplhj5frqd8a86egejyiwpx41xe9s6jhlq170zy1ywzwvc9uc4rhldupm80lq0rw2s75uitdszj8mf0s9dvh8m39wmii0ajcw3va61bykm1qdwu0lrybcqt50c4jap9dexgyfbv7dh9afminj06ifui42qhoo3xo51e81kg1gid0lelfuy6krimsjw7d19fkq4l29e4ijx35rz7ztf3ooiec0byz5rsay0max3diiv83ad132ev929h167q6ck1x8w6jh4m0r1e40rsw7lg2e2x0h3gq8arrchrfuzseu6z0157shserune1txebcg1ioowckaoml0aff4j03d4d8lcqnqw223vvslfqavejzjruucvf9suyji1yaoay56gvimv4cgv2twkovypqq4occjw1mzenc7e4tqw2hy5pnf5zbfrtvfvg22xj'

export default function CluesChallenge({ challenge, onSuccess }) {
  const [input, setInput] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | error | success

  async function handleSubmit(e) {
    e.preventDefault()
    if (!input.trim() || status === 'loading') return

    setStatus('loading')
    const correct = await validateAnswer(input, challenge.expectedHash, challenge.normOptions)

    if (correct) {
      setStatus('success')
      setTimeout(() => onSuccess(), 800)
    } else {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 2000)
    }
  }

  return (
    <div className="clues-page">
      <p className="clues-code">{CODE_BLOCK}</p>

      <ul className="clues-list">
        <li>parede 1</li>
        <li>prateleira 2</li>
        <li>titulo <span className="clues-mono">ivjqdhyyglt,gyvifrtoq</span></li>
        <li>entre as paginas 240 á 280</li>
      </ul>

      <form className="challenge-form clues-form" onSubmit={handleSubmit}>
        <input
          className={`challenge-input ${status === 'error' ? 'input-error' : ''}`}
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Sua resposta..."
          disabled={status === 'loading' || status === 'success'}
          autoComplete="off"
          spellCheck="false"
        />
        <button
          className="challenge-btn"
          type="submit"
          disabled={status === 'loading' || status === 'success'}
        >
          {status === 'loading' ? 'Verificando...' : 'Enviar'}
        </button>

        {status === 'error' && (
          <p className="feedback feedback-error">Resposta incorreta. Tente novamente.</p>
        )}
        {status === 'success' && (
          <p className="feedback feedback-success">Correto. Avançando...</p>
        )}
      </form>
    </div>
  )
}
