import { Link } from 'react-router-dom'
import { Motif } from '../components/Motif'
import { tx } from '../i18n/ui'
import { useGuide } from '../state/GuideContext'

export function Learn() {
  const { lang } = useGuide()
  const isMr = lang === 'mr'

  return (
    <article className="page prose">
      <p className="kicker">{tx(lang, 'pageExplainer')}</p>
      <h1>{tx(lang, 'explainerTitle')}</h1>
      <Motif />
      <p className="lead">{tx(lang, 'explainerLead')}</p>

      {isMr ? (
        <>
          <p>
            पुण्यात शेकडो सार्वजनिक गणेशोत्सव मंडळे आहेत. त्यांच्यापैकी फक्त पाचांना{' '}
            <strong>मानाचे गणपती</strong> म्हटले जाते. हे मान लोकमान्य टिळकांच्या काळातील
            सार्वजनिक उत्सवाशी आणि जुन्या शहराच्या ग्रामदैवत–ग्रामदेवी परंपरेशी जुळलेले आहे.
            विसर्जन मिरवणुकीत हीच पाच मंडळे ठरावीक क्रमाने पुढे जातात.
          </p>
          <ol>
            <li>कसबा गणपती — मानाचा पहिला, पुण्याचे ग्रामदैवत.</li>
            <li>तांबडी जोगेश्वरी — मानाचा दुसरा, ग्रामदेवीच्या मंदिराशी.</li>
            <li>गुरुजी तालीम — मानाचा तिसरा, हिंदू–मुस्लिम तालीमेची साथ.</li>
            <li>तुळशीबाग गणपती — मानाचा चौथा, बाजारातील मान.</li>
            <li>केसरीवाडा गणपती — मानाचा पाचवा, टिळक व केसरीची स्मृती.</li>
          </ol>
          <p>
            दगडूशेठ हलवाई भव्य आणि प्रिय आहे, पण तो या पाचांत नाही. त्याला “पहिला” समजणे ही
            पर्यटकांची चूक आहे. कसबाचे पहिले मान मूर्तीच्या आकारासाठी नाही — शहराने पहिले
            नमन तिथेच करावे म्हणून आहे.
          </p>
          <p>
            हा संकेतस्थळ तुम्हाला <em>क्रमाने</em> नेतो. जवळचे मंडळ वेगळे दिसले तरी सुरुवात
            कसबा इथून. काही दर्शन आधी झाले असतील तर ती स्थाने नोंदवा; पुढे मानाच्या रांगेतील
            पुढचा बाकी गणपती येतो.
          </p>
        </>
      ) : (
        <>
          <p>
            Pune has hundreds of public Ganesh mandals. Only five are called{' '}
            <strong>Maanache Ganpati</strong> — the honoured ones. That honour is tied to the
            old city’s guardian deities and to the public festival Lokmanya Tilak helped make
            civic. In the visarjan procession these five still move in a fixed order.
          </p>
          <ol>
            <li>Kasba Ganpati — first, the city’s gramdaivat.</li>
            <li>Tambdi Jogeshwari — second, the gramdevi’s temple.</li>
            <li>Guruji Talim — third, a Hindu–Muslim talim’s companionship.</li>
            <li>Tulshibaug Ganpati — fourth, the market’s honour.</li>
            <li>Kesariwada Ganpati — fifth, Tilak and the Kesari press.</li>
          </ol>
          <p>
            Dagdusheth Halwai is beloved and enormous. It is not one of the five. Calling it
            “the first Ganpati of Pune” is a visitor’s mix-up. Kasba’s first maan is not about
            the size of the idol. It is about which door the city knocks on first.
          </p>
          <p>
            This site walks you <em>in order</em>. Even if another mandal is closer, we begin
            at Kasba. If you have already had some darshan, mark those stops. The next
            unvisited Ganpati in the honour line becomes your next walk.
          </p>
        </>
      )}

      <nav className="home-links">
        <Link to="/festival">{tx(lang, 'festivalNote')}</Link>
        <Link to="/others">{tx(lang, 'otherGanpatis')}</Link>
        <Link to="/map">{tx(lang, 'overviewMap')}</Link>
      </nav>
    </article>
  )
}
