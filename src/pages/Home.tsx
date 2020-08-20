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
} from "@ionic/react";
import React, { useState } from "react";

const Home: React.FC = () => {
  const waehrungen = ["EUR", "USD"];

  const [isloading, setisloading] = useState(false);

  const getAka = (inp: string) => {
    switch (inp) {
      case "EUR":
        return "Euro";
      case "USD":
        return "US Dollar";
      default:
        return "Mmh";
    }
  };

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
                    <IonInput placeholder="Eingabe" />
                    <IonSelect
                      interfaceOptions={{
                        header: "Währung",
                      }}
                      placeholder="Währung"
                      cancelText="Ne, lass"
                      okText="Ja, OK"
                    >
                      {waehrungen.map((e) => (
                        <IonSelectOption value={e}>{getAka(e)}</IonSelectOption>
                      ))}
                    </IonSelect>
                  </IonItem>
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol hidden={true} sizeMd="6" size="12">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Eingabe</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonInput placeholder="Eingabe" />

                  <IonSelect
                    interfaceOptions={{
                      header: "Währung",
                    }}
                    placeholder="Währung"
                    cancelText="Ne, lass"
                    okText="Ja, OK"
                  >
                    {waehrungen.map((e) => (
                      <IonSelectOption value={e}>{getAka(e)}</IonSelectOption>
                    ))}
                  </IonSelect>
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
                    <IonInput placeholder="Ausgabe" disabled={true} />
                    <IonSelect
                      interfaceOptions={{
                        header: "Währung",
                        translucent: true,
                      }}
                      placeholder="Währung"
                      cancelText="Ne, lass"
                      okText="Ja, OK"
                    >
                      {waehrungen.map((e) => (
                        <IonSelectOption value={e}>{getAka(e)}</IonSelectOption>
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
                  <h2>Daten sind Aktuell vom 19.08.2020</h2>
                  <IonText>
                    Hinweis: Die Daten werden nur täglich erneuert
                  </IonText>
                  <br />
                  <br />
                  <IonButton onClick={() => setisloading((e) => !e)}>
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
                    <IonToggle color="medium" />
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
