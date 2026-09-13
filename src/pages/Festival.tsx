import { Motif } from '../components/Motif'
import { tx } from '../i18n/ui'
import { useGuide } from '../state/GuideContext'

export function Festival() {
  const { lang } = useGuide()
  const isMr = lang === 'mr'

  return (
    <article className="page prose">
      <p className="kicker">{tx(lang, 'pageFestival')}</p>
      <h1>{tx(lang, 'festivalTitle')}</h1>
      <Motif />

      {isMr ? (
        <>
          <h2>सकाळचे दर्शन</h2>
          <p>
            गणेशोत्सवात पाचही मानाची चाल पहाटे सुरू करा — शक्यतो ५:०० ते ७:००. रांगा लहान,
            हवा थंड, पेठ अजून शहर असते. दुपार आणि संध्याकाळ कार्यालयीन गर्दीने भरते.
          </p>
          <h2>सणाचे दहा दिवस</h2>
          <p>
            मंडपे उशिरापर्यंत उघडी, ढोल-ताशा, प्रकाश व रांगा. पहिली चार स्थाने एकाच पायी
            फेरीत बसतात (सुमारे १–१.५ किमी). केसरीवाडा थोडे दूर — चाल किंवा छोटा ऑटो.
            गाडी दाराशी नको; लक्ष्मी रोड / मंडई / हुतात्मा चौकजवळ एकदा पार्क करा.
          </p>
          <h2>अनंत चतुर्दशी / विसर्जन</h2>
          <p>
            रस्ते बंद, मिरवणुका, पोलिसांचे अडथळे. नकाशाची रेषा कागदावरची. पादचारी रांगा व
            अधिकाऱ्यांना अनुसरा. कसबा गणपती पुढे होईपर्यंत मुख्य विसर्जन मिरवणूक निघत नाही.
            या दिवशी पाचही दर्शन हा ध्येय नसावा — श्रद्धा आणि सुरक्षितता आधी.
          </p>
          <h2>वर्षभराचे दिवस</h2>
          <p>
            कसबा आणि तांबडी जोगेश्वरी वर्षभर मंदिरे आहेत. गुरुजी तालीम, तुळशीबाग व केसरीवाडा
            सणात अधिक ओळखले जातात; इतर दिवशी शांत, वेळा कमी, उत्सवी मूर्ती नसते. तरीही मानाचा
            क्रम तोच. टिळक वाडा पाहणे केसरीवाडा दर्शनाचा भाग होऊ शकते.
          </p>
          <h2>व्यावहारिक</h2>
          <p>{tx(lang, 'practicalBody')}</p>
        </>
      ) : (
        <>
          <h2>Sakal darshan</h2>
          <p>
            In Ganeshotsav, begin the five at dawn — 5:00 to 7:00 if you can. Queues are
            shorter, the air is kinder, and the peths still feel like a neighbourhood.
            Afternoons and evenings fill with office crowds.
          </p>
          <h2>The ten festival days</h2>
          <p>
            Mandaps stay open late. Expect dhol-tasha, lights, and lines. The first four
            stops are one walking loop (about 1–1.5 km). Kesariwada is the longer hop —
            walk or a short auto. Do not chase doorstep parking. Leave a vehicle once near
            Laxmi Road, Mandai, or Hutatma Chowk.
          </p>
          <h2>Anant Chaturdashi / visarjan</h2>
          <p>
            Roads close. Processions own the junctions. Police tape beats the map. Follow
            foot-queues and officers. The main immersion column does not move until Kasba
            Ganpati leads. Completing all five that day is a hope, not a promise — faith
            and safety come first.
          </p>
          <h2>The rest of the year</h2>
          <p>
            Kasba and Tambdi Jogeshwari are living temples all year. Guruji Talim,
            Tulshibaug and Kesariwada are most themselves during the festival; on ordinary
            days they are quieter, hours are shorter, and the tall murti may not stand.
            The honour order does not change. A look through Tilak’s wada can sit beside
            Kesariwada darshan.
          </p>
          <h2>Practical</h2>
          <p>{tx(lang, 'practicalBody')}</p>
        </>
      )}
    </article>
  )
}
