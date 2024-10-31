import CharacterChoice from "./components/character-choice";
import { TrashIcon, ClipboardDocumentIcon, PencilIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import toast, { Toaster } from "react-hot-toast";
import rand from './lib/rand';

interface PassData {
  id: string,
  value: string,
}

function App() {
  const [passData, setPassData] = useState<PassData[]>([]);
  const [charsLength, setCharsLength] = useState(50);
  const [lowerChars, setLowerChars] = useState(true);
  const [upperChars, setUpperChars] = useState(true);
  const [turkishChars, setTurkishChars] = useState(false);
  const [uniqPass, setUniqPass] = useState(false);
  const [letters, setLetters] = useState(false);
  const [genRes, setGenRes] = useState(false);

  const generatePass = () => {
    const s = uniqPass ? rand.uniq() : rand.gen(charsLength, {
      lowerChars,
      upperChars,
      turkishChars,
      letters
    });

    if (typeof s !== "string") {
      toast.error("Şifre oluşturulurken bir hata meydana geldi! Lütfen seçimlerinizi tekrar kontrol ediniz.");
    } else {
      setPassData(prevData => [...prevData, {
        id: rand.uniq(),
        value: s,
      }]);
      setGenRes(true);
    }
  };

  const changeCharsLength = (event: any) => {
    setCharsLength(Number(event.target.value)); // Dönüşüm eklendi
  };

  const writeAccess = (id: string) => {
    const element = document.getElementById(id);
    if (element instanceof HTMLInputElement) { // Tür kontrolü yapıldı
      element.readOnly = false;
    }
  };

  const deletePass = (id: string) => {
    setPassData(prevData => prevData.filter(item => item.id !== id));
  };

  return (
    <div className="App">
      <div className="password-generator">
        <div className="text-center">
          <h1 className="text-4xl font-black my-5">CanSifre - Basit ve Hızlı Şifre Oluşturucunuz</h1>
        </div>

        <div>
          <p className="text-slate-500 my-4">
            Ücretsiz ve basit şifre oluşturucu. Şifrede hangi karakterlerin olacağı ve şifrenizin uzunluğunu belirledikten sonra &apos;Şifremi Oluştur&apos; butonuna tıklayınız. <br />
            Butonun altında yeni bir alan belirecektir, bu alanda sizin için oluşturulmuş şifreniz yer almaktadır. <br />
            Dilerseniz bu şifreyi kopyalayabileceğiniz bir buton da hemen sağında yer almaktadır.
          </p>
        </div>

        <div id="selectCharacters" className="flex flex-col w-full m-auto justify-center items-center">
          <CharacterChoice id="upperChars" text="Büyük harfler olsun mu?" checked={upperChars} onClick={() => setUpperChars(!upperChars)} />
          <CharacterChoice id="lowerChars" text="Küçük harfler olsun mu?" checked={lowerChars} onClick={() => setLowerChars(!lowerChars)} />
          <CharacterChoice id="turkishChars" text="Türkçe karakterler olsun mu?" checked={turkishChars} onClick={() => setTurkishChars(!turkishChars)} />
          <CharacterChoice id="letters" text="Rakamlar olsun mu?" checked={letters} onClick={() => setLetters(!letters)} />
          <br />
          <CharacterChoice id="uniq" text="Benzersiz bir şifre oluşturmak ister misiniz? (bu seçeneği seçerseniz diğer seçimleriniz dikkate alınmaz!)" checked={uniqPass} onClick={() => setUniqPass(!uniqPass)} />
        </div>

        <div className="w-full">
          <div className="flex gap-4 items-center">
            <span className="text-lg">Şifre Uzunluğunuzu Seçiniz: </span>
            <input
              type="range"
              value={charsLength}
              min={1} // Minimum değer 1'e yükseltildi
              max={100}
              onChange={changeCharsLength}
              className="w-96 my-4 h-4 bg-slate-200 dark:bg-slate-600 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-lg font-semibold">
              {charsLength}
            </span>
          </div>
        </div>

        <div className="w-full">
          <button id="btnGenPass" className="w-full my-4 font-bold border border-solid border-slate-400 hover:outline hover:outline-black active:bg-slate-500 active:text-white rounded-lg p-4 hover:transition-all" type="button" onClick={generatePass}>Şifremi Oluştur</button>
        </div>

        <div className="w-full">
          {
            genRes && (
              <div className="w-full flex justify-between gap-2">
                <table className="w-full">
                  <caption>
                    <h2 className="text-2xl font-bold mt-5 mb-2">Oluşturulan Şifreleriniz</h2>
                  </caption>
                  <tbody>
                    {
                      passData.map((cPass) => (
                        <tr className="w-full gap-4 flex justify-between items-center" id={cPass.id} key={rand.uniq()}>
                          <td className="w-full">
                            <input className="w-full bg-slate-100 text-black dark:bg-slate-700 dark:text-white border border-solid border-black dark:border-slate-400 rounded-lg p-2" type="text" readOnly={true} value={cPass.value} />
                          </td>
                          <td>
                            <div className="flex gap-2">
                              <button className="dbtn editbtn" onClick={() => writeAccess(cPass.id)} >
                                <PencilIcon className="size-6" />
                              </button>
                              <CopyToClipboard text={cPass.value} onCopy={() => toast.success("Oluşturulan Şifre Panoya kopyalandı!")}>
                                <button className="dbtn"><ClipboardDocumentIcon className="size-6" /></button>
                              </CopyToClipboard>
                              <button className="dbtn delbtn" onClick={() => deletePass(cPass.id)}>
                                <TrashIcon className="size-6" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            )
          }
        </div>

        <footer>
          &copy; {new Date().getFullYear()} <a target="_blank" rel="noopener noreferrer" className="decoration-1 decoration-solid decoration-blue-500" href="https://ahmetcanisik.vercel.app">ahmetcanisik</a>
        </footer>
      </div>

      <Toaster position="bottom-center" />
    </div>
  );
}

export default App;