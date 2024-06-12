# Sammanfattning

Detta projekt är en implementering av en webbplats som säljer produkter online.
För att skapa detta projekt användes Material UI(MUI) v5.15, som är ett bibliotek för att skapa projekt i react.

Webbplatsen har en horisontell meny för navigera i applikationen och har följande alternativ för att komma åt varje del av webbplatsen:

- **Home**: Det är applikationens huvudsida.
- **Categories**: Visar de kategorier som programmet har för att gruppera - produkter.
- **Login**: I utvecklingsläge.
- **Cart**: Innehåller de produkter som valts ut för eventuell försäljning.

För att förbättra kund navigerar på webbplatsen implementerades tre åtkomst knappar:

- **All Categories**: Visar varje kategori med sin respektive bild och en beskrivning för en bättre förståelse av produkten till salu.
- **New Now**: Visar nya produkter till salu.
- **Sale**: Visar alla produkter som finns på rea.

# Designstruktur för applikationen

Applikationen har en grundläggande utvecklingsstruktur som visas i följande bild:

![](https://i.imgur.com/YuuNNZM.jpeg)

Följande struktur beskrivs nedan.

# Incasale-dev
Det är roten till applikationen som innehåller hela designstrukturen. Inuti denna huvudmapp kommer vi att se två undermappar som är backend och frontend.

# Backend
Under utveckling men den här mappen kommer att innehålla strukturen för API REST för anslutning till servern och kommer att skapa motsvarande URL som ska återanvändas i backend.

# Frontend
Denna mapp innehåller strukturen som ansvarar för att separera funktionaliteten i projektet och innehåller all design av sidorna som ska ses av kunden.
Den innehåller också en fil index.html och fungerar som ingångspunkt för webbapplikation. Den innehåller den grundläggande HTML-strukturen som initialt visas i webbläsaren. Den här filen innehåller den grundläggande HTML-layouten, inklusive ett element taggat med ett id-attribut, vanligtvis märkt som "root", där React-applikationen integreras.

## node_modules:
Alla verktyg och bibliotek som används i projektet sparas i den här mappen.

## Public
Den innehåller ikonen incasale-dev.svg som används för att visas i den översta fliken i vår webbläsare.

## Src
Denna mapp innehåller designen av alla sidor i vårt projekt som behövs för att kan visar till kunden. Den innehåller också huvudfilerna för åtkomst till projektkomponenterna som:

- **App**: Innehåller all import av projektkomponenterna. Det är här projektets alla dynamiska rutter skapas och på så sätt håller URL synkroniserad med innehållet i applikationen, så att du kan kontrollera flödet av data i applikationen.
I den här delen, skapa en variabel "shoppingCartContext " med "createContext([ ])" som låter dig skapa ett  sammanhang  som komponenter kan tillhandahålla eller läsa. shoppingCartContext det kommer att funkar för att sparar sammanhang till variabeln som kommer att använda när väljer en produkt och kommer at laddar up på kundvagn.

````javascript
    export const shoppingCartContext = createContext([]);
    const [shoppingCart, setShoppingCart] = useState([]);
    <shoppingCartContext.Provider
        value={{
          shoppingCart,
          setShoppingCart,
        }}
      >
````

- **Main**: Här skapas root React-komponenten som fungerar som en behållare för hela React-applikationen. Ställ in det nödvändiga sammanhanget och ge rotkomponenten åtkomst till React DOM.

![](https://i.imgur.com/pLyCa7l.jpeg)

### Controller
Den här mappen innehåller filen GetData.jsx, som genom en asynkron begäran hämtar JSON-data från (https://dummyjson.com/products).

### Functions
Den här mappen innehåller filen Functions.jsx, där de globala funktionerna sparas så att de kan återanvändas inom projektet.

### Navbar
Inuti den här mappen finns filerna som tillåter navigerar till varje del av projektet.

- **Navbar**: Det är huvudmenyn som visas högst upp eller i navigeringsfältet, den låter användare navigerar på webbplatsen snabbt och enkelt.
För att kan navigerar på applikationen det använnder "NavLink" som är en  komponent för ersättning av ankartaggar som tillhandahålls av react-router-dom för att navigerar runt i react-applikationen. Med " to- prop" ställer in path eller route som ska visas när länken klickas. I allmänhet använder vi HTML-ankartaggar för detta ändamål när vi navigerar.
Vissa HTML-ankartaggar laddar om sidan och rendering om alla komponenter. Medan "NavLink" endast rendering uppdaterade komponenter som matchas med URL-sökvägen för rutten utan att laddas om. Det hjälper Single-Page Applications att arbeta snabbare under routing.

   Här importeras shoppingCartContext som har en global variabel shoppingCart och dess funktion är att hålla "Cart"-ikonen uppdaterad längst upp till höger i Navbar. Nar klicka på Cart ikon det kommer att rendering till ShoppingCart komponent.


````javascript
    import { shoppingCartContext } from "../../App";
    const { shoppingCart } = useContext(shoppingCartContext);

    <Tooltip
       title={shoppingCart.length === 0 && "You cart is empty"}
       arrow
       <IconButton
         ...
         component={NavLink}
         to={shoppingCart.length > 0 && "/ShoppingCart"}
       >
         <StyledBadge
           badgeContent={shoppingCart.reduce(
             (item, total) => item + total.quantity,
             0
           )}
           ...
         >
           <ShoppingCartIcon />
         </StyledBadge>
       </IconButton>
    </Tooltip>

````

- **BreadcrumbsURL**: Det användas denna komponent för att visa var användaren befinner sig på webbplatsen.
Det användas för att göra det extra tydligt var i strukturen användaren befinner sig. De brukar placeras direkt ovanför huvudinnehållet och visar den synliga sökvägen ner genom den hierarkiska strukturen. Länkstigar används ofta av användarna för att navigera uppåt i strukturen.

- **NavListDrawer**: När applikationen är på följsam webbdesign det kommer att ändrar designen och det kommer att visar en navigeringslåda(Drawer) för att kan visar de meny alternativ.
Tillfälliga navigeringslådor kan växla mellan öppna och stänga. Stängd som standard öppnas lådan tillfälligt över allt annat innehåll tills ett avsnitt väljs.
Lådan kan avbrytas genom att klicka på överlägget eller trycka på Esc-tangenten. Den stängs när ett objekt väljs, hanteras genom att styra den "open-prop."

### Views
Denna mapp innehåller de olika sidorna som användaren kan besöka. Alla komponenter hämtar information från produkter listan i JSON-dataformat.

Alla GET-anrop till URL-sökvägen görs genom en asynkron "GetDataProducts"-funktion som får ett löfte från GetProductList() som visas nedan:

````javascript
    useEffect(() => {
        const GetDataProducts = async () => {
        const products = await GetProductList();
        .....
        ....
        };
        GetDataProducts();
    }, []);

    <BodyComponent arrayChildren={arrayChildren} pageRender={"Home"} /> 
````

- **HomeHeader**: Den här komponenten är avsedd att visa tre horisontella knappar (All Categories, New Now, Sale) under "Navbar" för att få mer flexibel  navigering i applikationen.
Det används "Stack" som är container komponent för att arrangera element vertikalt eller horisontellt.
Stack-komponenten hanterar layouten för sina närmaste barn längs den vertikala eller horisontella axeln, med valfritt avstånd och avdelare mellan varje barn.

- **Home**: Det använder useEffect hook och hakparentesen ([ ]) så att begäran till URL:en endast görs vid den första renderingen
För att visa innehållet i den hämtade informationen laddas "BodyComponent" komponenten, som laddas med en "props" som är "arrayChilren" denna array innehåller hela listan med produkter: 

````javascript
    useEffect(() => {
        const GetDataProducts = async () => {
        const products = await GetProductList();
        setArrayChildren([...products.products])
        };
        GetDataProducts();
    }, []);

    <BodyComponent arrayChildren={arrayChildren} pageRender={"Home"} /> 
````
 
- **AllCategories**: Det använder denna komponent föt att visa alla kategorier som finns på butiken. Det användade "Card" komponent för att visa katgorier. Målet är att denna komponent visar en kategori med sin respektiv bild och beskrivning.

   Som kan se på koden med "map" instruktionen det läser hela data array och med "New Set" instruktinen det skapar bara en enda kategori namn  för värje grupp av kategorier och sparar på en data array(Categories).

````javascript
    const categories = [
        ...new Set(listproducts.map((res) => res.category)),
      ];
````
       Det läser sen data array "Categories" och för värje kategori namn som hittar på produkter katalogen 
       med "find" instruktionen får den första register och sparar på en array state.

````javascript
     categories.map((item) =>
        setResult((previousState) => [
          ...previousState,
          listproducts.find((element) => element.category === item),
        ])
      );
````

- **NewNow**: För att kan visa några produkter från produkter katalog det anväder en  filter som får de jämna nummer från array sedan för att visa innehållet i den hämtade informationen laddas "BodyComponent" komponenten, som laddas med en "props" som är "arrayChilren" denna array innehåller hela listan med produkter.

````javascript
      const arrFilter = listproducts.filter((num, index) => index % 2 == 0);

      <BodyComponent arrayChildren={arrayChildren} pageRender={"New Now"} />
````

- **Sale**: För att kan visa några produkter från produkter katalog det anväder en  filter som  hitta produkter som pricer är <= 30 sedan för att visa innehållet i den hämtade informationen laddas "BodyComponent" komponenten, som laddas med en "props" som är "arrayChilren" denna array innehåller hela listan med produkter.

````javascript
      const arrFilter = listproducts.filter((filter) => filter.price <= 30);

      <BodyComponent arrayChildren={arrayChildren} pageRender={"Sale"} />
````

- **Products**: Det visar en produkter lista beroende på vilken kategori valde, för att få det detta komponenten gör ett filter beroende på valde kategori. Denna komponent anropas från "navbar" eller knappen "Alla kategorier" i HomeHeader. Sedan för att visa innehållet i den hämtade informationen laddas "BodyComponent" komponenten, som laddas med en "props" som är "arrayChilren" denna array innehåller hela listan med produkter.

````javascript
      const arrFilter = listproducts.filter(
        (filter) => filter.category === title.toLowerCase()
      );

      <BodyComponent arrayChildren={arrayChildren} pageRender={title} />
````

- **BodyComponent**: Det är en av huvudkomponenterna som får två props: { arrayChildren, pageRender }, den första är en array som innehåller en filtrerad lista med produkter och den andra är titeln för rubriken som kommer att visas i den här komponenten. "Grids" och "Card" används för att skapa en ordnad struktur.
Det använnder "NavLink"  och "to" för att ställer in path eller route som ska visas när länken klickas.
Genom att klicka på något av "Card" kommer att till länken "DetailProduct" som kommer att innehålla en titel som parameter.

````javascript
      export default function BodyComponent({ arrayChildren, pageRender }) {
      ....
      ...
         component={NavLink} 
         to={`/DetailProduct/${itemprducts.title}`}
      ....
      ...
      }
````

- **DetailProduct**: Denna komponent har som mål att visa alla detaljer för den valda produkten, får titeln som en parameter från URL:en, importerar "shoppingCartContext" för att hålla kundvagnen uppdaterad när antalet valda produkter ökas eller minskas och gör ett filter när parametern Produkttitel är lika med en produkt i produktkatalogen.

````javascript
      import { shoppingCartContext } from "../../App";
      const { title } = useParams();
      const arrFilter = listproducts.filter((filter) => filter.title === title);
      ....
      setShoppingCart((prevItems) => {
        return prevItems.map((item) => {
          if (item.id === itemprducts.id) {
            return { ...item, quantity: quantity };
          }
          return item;
        });
      });
````

- **ShoppingCart**: Det är här som genomför inköpsprocessen för alla utvalda produkter, uppdelad i tre kolumner:

   - **Orders:** Detta är de utvalda produkterna, kunden har möjlighet att öka eller minska antalet produkter eller ta bort produkten om de inte längre vill ha den.
   - **Order Sumary:** Här beräknas beloppen som ska betalas och kommer att hållas uppdaterade beroende på antalet valda produkter.
   - **Register:** Det är ett formulär som kunden registrerar sina personuppgifter för att kan göra betalningen.

````javascript
      Orders
      const { shoppingCart, setShoppingCart } = useContext(shoppingCartContext);
      setArrayChildren([...shoppingCart]);

      Order Sumary
      const updateQuantity = (itemId, newQuantity) => {
         if (newQuantity >= 1 && newQuantity <= 999) {
           setShoppingCart((prevItems) => {
             return prevItems.map((item) => {
               if (item.id === itemId) {
                 return {
                   ...item,
                   quantity: newQuantity,
                   totalprice: item.price * newQuantity,
                 };
               }
               return item; 
             });
           });
         }
      };
      onClick={() =>
         updateQuantity(itemprducts.id, itemprducts.quantity + 1)
      }
      onClick={() =>
         updateQuantity(itemprducts.id, itemprducts.quantity - 1)
      }
````
Det använnder "NavLink"  och "to" för att ställer in path eller route som ska visas när länken klickas.
Genom att klicka på knapp "Payment" kommer att till länken "Payment" som kommer att innehålla flera parameters som kommer att visa på nästa komponent.

- **PaymentProgress**: Innan går in i "Payment"-komponenten, gör det en simulering av betalningen som pågår, som anropas från "Paymet" med en "setPayment"-props  som innehåller ett boolean värde "true" och när simuleringen tiden avslutas omvandla det till "false" för att återkommer till "Payment" komponenten.

````javascript
   export default function PaymentPogress({ setPayment }) {
      ....
      ...
      const timer = setInterval(() => {
               setProgress((prevProgress) =>
                 prevProgress >= 100 ? 0 : prevProgress + 10
               );
             }, 800);
      ....
      ...
      {progress >= 100 && setPayment(false)}
   }
````

- **Payment**: Ta emot parametrar från URL. Det är bekräftelsen att köpet gjordes framgångsrikt, som visar de information som laddas upp tidigare.

````javascript
   const params = useParams();

   <Typography sx={{ display: "flex", fontWeight: 300 }}>
      Name
      <Typography>{" : " + params.names}</Typography>
   </Typography>
   ....
   ...
````