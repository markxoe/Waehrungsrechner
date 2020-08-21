import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonGrid,
  IonRow,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonCardContent,
  IonSelect,
  IonInput,
  IonSlide,
  IonLabel,
  IonButton,
  IonText,
  IonToggle,
  IonSelectOption,
  IonProgressBar,
  useIonViewWillEnter,
} from "@ionic/react";
import React, { useState, useEffect } from "react";

import darkmode from "../functions/darkmode";
const Home: React.FC = () => {
  const [waehrungen, setWaehrungen] = useState<string[]>([]);
  const [isloading, setisloading] = useState(false);
  const [InputVal, setInputVal] = useState<number | undefined>(undefined);
  const [OutputVal, setOutputVal] = useState<number | undefined>(undefined);
  const [InputWaehrung, setInputWaehrung] = useState<string>("");
  const [OutputWaehrung, setOutputWaehrung] = useState<string>("");

  const [dataDate, setDataDate] = useState<string>("Laden...");
  const [allRates, setAllRates] = useState<{ [id: string]: number }>({});
  const loadData = async () => {
    setisloading(true);
    const data = await fetch("https://api.exchangeratesapi.io/latest").then(
      (e) => e,
      () => null
    );
    if (data !== null) {
      if (data.status === 200) {
        const daa: string = await data.text();
        const jsondata: {
          rates: { [id: string]: number };
          base: string;
          date: string;
        } = JSON.parse(daa);

        setDataDate(jsondata.date);

        var _allRates = jsondata.rates;
        _allRates[jsondata.base] = 1;
        setAllRates(_allRates);

        const _waeherungen: string[] = Object.keys(_allRates);
        setWaehrungen(_waeherungen);

        addToast("Daten Geladen");
      } else {
        addToast("Fehler beim Laden: " + data.status);
      }
    } else {
      addToast("Fehler beim Laden");
    }
    setisloading(false);
  };

  const calc = () => {
    if (InputVal !== undefined) {
      if (InputWaehrung !== "" && OutputWaehrung !== "") {
        setOutputVal(
          InputVal / (allRates[InputWaehrung] / allRates[OutputWaehrung])
        );
      }
    } else {
      setOutputVal(undefined);
    }
  };

  const addToast = (msg: string, duration: number = 2000) => {
    let element = document.createElement("ion-toast");
    element.message = msg;
    element.duration = duration;
    element.buttons = [{ text: "OK", role: "cancel" }];
    document.body.appendChild(element);
    element.present();
  };

  const getAka = (inp: string) => {
    var c: { [id: string]: string } = {
      CAD: "Kanadischer Dollar",
      HKD: "Hongkong Dollar",
      EUR: "Euro",
      USD: "US Dollar",
      CHF: "Schweizer Franken",
      AUD: "Australischer Dollar",
      BGN: "Lew",
      BRL: "Brasilianischer Real",
      CNY: "Chinesisher Yuan",
      CZK: "Tschechische Krone",
      DKK: "Dänische Krone",
      GBP: "Pfund",
      HRK: "Kroatische Kuna",
      HUF: "Korint",
      IDR: "Indonesische Rupiah",
      ILS: "Schekel",
      INR: "Indische Rupie",
      ISK: "Isländische Krone",
      JPY: "Yen",
      KRW: "Südkoreanischer Won",
      MXN: "Mexikanischer Peso",
      MYR: "Malaysischer Ringgit",
      NOK: "Norwegische Krone",
      NZD: "Neuseeland Dollar",
      PHP: "Philippinischer Peso",
      PLN: "Złoty",
      RON: "Rumänischer Leu",
      RUB: "Russischer Rubel",
      SEK: "Schwedische Krone",
      SGD: "Singapur-Dollar",
      THB: "Baht",
      TRY: "Türkische Lira",
      ZAR: "Südafrikanischer Rand",
    };
    return c[inp] ?? "Mmmh";
  };
  darkmode.init();
  useEffect(() => calc(), [
    { OutputWaehrung },
    { InputWaehrung },
    { InputVal },
    { dataDate },
  ]);
  useIonViewWillEnter(() => loadData());
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Währungsrechner</IonTitle>
          <IonProgressBar hidden={!isloading} type="indeterminate" />
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Währungsrechner</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          <IonRow>
            <IonCol sizeMd="6" size="12">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Eingabe</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonItem>
                    <IonInput
                      placeholder="Eingabe"
                      type="number"
                      value={InputVal}
                      onIonChange={(e) => {
                        setInputVal(
                          e.detail.value ? parseInt(e.detail.value) : undefined
                        );
                        calc();
                      }}
                    />
                    <IonSelect
                      interfaceOptions={{
                        header: "Währung",
                      }}
                      placeholder="Währung"
                      cancelText="Ne, lass"
                      okText="Ja, OK"
                      onIonChange={(e) => {
                        setInputWaehrung(e.detail.value);
                        calc();
                      }}
                    >
                      {waehrungen.map((e) => (
                        <IonSelectOption key={e} value={e}>
                          {getAka(e)}
                        </IonSelectOption>
                      ))}
                    </IonSelect>
                  </IonItem>
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol sizeMd="6" size="12">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Ausgabe</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonItem>
                    <IonInput
                      placeholder="Ausgabe"
                      value={OutputVal?.toFixed(4)}
                      disabled={true}
                    />
                    <IonSelect
                      interfaceOptions={{
                        header: "Währung",
                        translucent: true,
                      }}
                      placeholder="Währung"
                      cancelText="Ne, lass"
                      okText="Ja, OK"
                      onIonChange={(e) => {
                        setOutputWaehrung(e.detail.value);
                        calc();
                      }}
                    >
                      {waehrungen
                        .sort((a, b) => getAka(a).localeCompare(getAka(b)))
                        .map((e) => (
                          <IonSelectOption key={e} value={e}>
                            {getAka(e)}
                          </IonSelectOption>
                        ))}
                    </IonSelect>
                  </IonItem>
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol sizeMd="6" size="12">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Status</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <h2>Daten sind Aktuell vom {dataDate}</h2>
                  <IonText>
                    Hinweis: Die Daten werden nur täglich erneuert
                  </IonText>
                  <br />
                  <br />
                  <IonButton onClick={() => loadData()}>
                    Aktualisieren
                  </IonButton>
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol>
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Einstellungen</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonItem>
                    <IonLabel>Dark Mode</IonLabel>
                    <IonToggle
                      onIonChange={(e) => darkmode.set(e.detail.checked)}
                      checked={darkmode.isDarkMode}
                      color="medium"
                    />
                  </IonItem>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
