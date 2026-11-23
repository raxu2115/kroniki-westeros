/* Kroniki Westeros — dodatki: zoom mapy, Zwyczaje i Prawa, Religia, schemat tworzenia postaci.
   Wczytywany jednym wierszem na końcu index.html (przed </body>). */
(function () {
  "use strict";

  /* ---------- 1. Nowe zakładki ---------- */
  VALID_TABS.push("laws", "religion");
  const mapBtn = document.querySelector('.nav-btn[data-tab="map"]');
  [["laws", "Zwyczaje i Prawa"], ["religion", "Religia"]].forEach(([id, label]) => {
    const b = mapBtn.cloneNode(true);
    b.dataset.tab = id;
    b.classList.remove("active");
    b.setAttribute("onclick", "switchTab('" + id + "')");
    b.textContent = label;
    mapBtn.before(b);
  });

  const head = (kicker, title, id) => `
    <div class="flex flex-col justify-between gap-3 border-b border-amber-500/25 pb-4 sm:flex-row sm:items-end">
      <div>
        <div class="font-display text-xs font-bold tracking-[0.2em] text-amber-400">${kicker}</div>
        <h1 class="font-display text-2xl font-bold tracking-wide text-amber-100 sm:text-3xl">${title}</h1>
      </div>
      <input type="text" oninput="filterDetails(this,'${id}')" placeholder="Szukaj w tej zakładce..."
        class="w-full rounded border border-amber-500/35 bg-stone-950/90 px-3.5 py-2 font-body text-base text-amber-100 placeholder-stone-500 focus:border-amber-400 focus:outline-none sm:w-64" />
    </div>`;

  document.getElementById("tab-map").insertAdjacentHTML("beforebegin", `
    <section id="tab-laws" class="tab-panel space-y-6">
      ${head("PRAWO I OBYCZAJ SIEDMIU KRÓLESTW", "ZWYCZAJE I PRAWA", "laws-list")}
      <div id="laws-list"></div>
    </section>
    <section id="tab-religion" class="tab-panel space-y-6">
      ${head("WIARA, BOGOWIE I PRZESĄDY", "WIARA I RELIGIA", "religion-list")}
      <div id="religion-list"></div>
    </section>`);

  const acc = (groups) => groups.map((g, i) => `
    <details ${i ? "" : "open"} class="parchment-card mb-4 rounded-lg p-5 sm:p-6">
      <summary class="cursor-pointer font-display text-lg font-bold text-stone-900">${g.t}</summary>
      <ul class="mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed text-stone-800 sm:text-lg">
        ${g.p.map((x) => `<li>${x}</li>`).join("")}
      </ul>
    </details>`).join("");

  window.filterDetails = function (input, id) {
    const q = input.value.trim().toLowerCase();
    document.querySelectorAll("#" + id + " details").forEach((d) => {
      let any = false;
      d.querySelectorAll("li").forEach((li) => {
        const m = !q || li.textContent.toLowerCase().includes(q);
        li.style.display = m ? "" : "none";
        if (m) any = true;
      });
      d.style.display = any ? "" : "none";
      if (q && any) d.open = true;
    });
  };

  /* ---------- 2. Zwyczaje i Prawa ---------- */
  const LAWS = [
    { t: "Władza i status", p: [
      "Władza pochodzi od króla, który otrzymuje ją od bogów — dawnych i nowych.",
      "Szlachta ma więcej praw i obowiązków niż pospólstwo; jej status zależy od urodzenia.",
      "Osoby o wyższej pozycji społecznej mają większe prawa i wpływy niż te o niższej.",
      "Mężczyźni mają większe prawa niż kobiety — <strong>wyjątek: Dorne</strong>, gdzie decyduje starszeństwo, nie płeć."
    ]},
    { t: "Dziedziczenie i bękarci", p: [
      "Dzieci szlachciców dziedziczą te same prawa co rodzice, o ile nie urodziły się poza małżeństwem.",
      "Dziedziczenie jest dla szlachty kluczowe. Prawowitymi następcami są pierworodni synowie, po nich ich bracia. Siostry — niezależnie od kolejności urodzenia — dziedziczą wyłącznie, gdy zabraknie braci.",
      "Bękarci (naturalne dzieci) mogą być uznani przez rodziców, a w szczególnych sytuacjach nawet dziedziczyć; zwykle jednak prawowite rodzeństwo ma pierwszeństwo w każdej kwestii.",
      "Bękarci często spotykają się z nieufnością i uprzedzeniami — uważa się ich za zrodzonych z „żądzy i kłamstw”. Bękarci szlachty noszą nazwiska zależne od regionu, z którego pochodzą."
    ]},
    { t: "Władza lorda, sprawiedliwość i kary", p: [
      "Lord danych ziem ma na nich największą władzę i stanowi o prawie: utrzymuje pokój, wysłuchuje próśb, wymierza królewską sprawiedliwość i nakłada kary — w imieniu suwerena i króla.",
      "Kary obejmują okaleczenie, śmierć oraz odebranie ziemi, bogactwa i tytułów.",
      "<strong>Przywdzianie czerni:</strong> przymusowa służba na Murze. Po dołączeniu do Nocnej Straży wszystkie winy zostają wybaczone, lecz oznacza to utratę ziem i praw (włącznie z prawem do małżeństwa) i dożywotnią służbę. Kobietom nie wolno przywdziewać czerni.",
      "<strong>„Ciemnica i szubienica”:</strong> królewskie prawo lordów do wtrącania poddanych do lochu i zarządzania egzekucji, jeśli przestępstwo to uzasadnia. Rycerze na włościach mogą wymierzać sprawiedliwość, ale nie mają tego prawa.",
      "<strong>Zwyczaj Pierwszych Ludzi:</strong> kto skazuje poddanego, powinien spojrzeć mu w oczy, wysłuchać ostatnich słów i osobiście wykonać wyrok. Północ nadal to kultywuje; na południu wielu lordów zatrudnia katów, np. Królewskiego Kata.",
      "Złodziej może stracić rękę, gwałciciel zostać wykastrowany, drobniejsze przestępstwa karze się chłostą.",
      "Egzekucje wykonuje się szubienicą, toporem lub mieczem; okrutni lordowie używają <strong>„wroniej klatki”</strong> — żelaznej klatki, w której skazaniec zamknięty bez wody i jedzenia umiera, dziobany przez wrony.",
      "Król może ułaskawić dowolnego przestępcę. Robert oszczędził tak wielu lordów, którzy w czasie wojny pozostali lojalni Targaryenom.",
      "Oskarżony lord może zażądać <strong>próby walki</strong> albo <strong>próby lordów</strong>, podczas której kilku szlachciców zapoznaje się z faktami i wygłasza wyrok."
    ]},
    { t: "Prawo gościnności", p: [
      "Tradycja sięgająca czasów Pierwszych Ludzi: nikomu, kto zjadł posiłek przy stole gospodarza, nie wolno wyrządzić krzywdy, dopóki nie opuści jego progów.",
      "Zwyczajowo gość może poprosić o <strong>chleb i sól</strong>; osoby nieufne wobec gospodarzy robią to czasem tuż po przybyciu.",
      "Karą za złamanie tej zasady jest — jak mówią — przekleństwo bogów."
    ]},
    { t: "Dorosłość, małżeństwo i ślub", p: [
      "Pełnoletność osiąga się w wieku <strong>16 lat</strong>; wcześniej młodzieniec bywa „prawie dorosłym mężczyzną”. Dla dziewcząt ważna jest też pierwsza „miesięczna krew” — szlachcianki często przechodzą ją młodziej.",
      "Ślubów raczej nie zawiera się przed dorosłością, choć żadne prawo tego nie zakazuje. Szlachta często zaręcza dzieci bardzo młodo, a małżeństwo przed 16. rokiem życia bywa konieczne z powodów politycznych (np. dziedziczenia). Małżeństwa nie konsumuje się przed pierwszą krwią panny młodej — uznano by to za perwersję i obrazę bogów.",
      "Wyznawcom Siedmiu ślubu udzielają septoni; czczący dawnych bogów składają przysięgi przed czardrzewem.",
      "Nie można zmusić do ślubu kogoś, kto odmawia przysięgi, ale presja rodziny bywa silna, zdarzają się też groźby użycia siły.",
      "Małżeństwo można unieważnić, szczególnie jeśli nie zostało skonsumowane."
    ]},
    { t: "Wychowankowie i zakładnicy", p: [
      "Sojusze rodów zawiera się często przez wzięcie na wychowanie synów innego lorda w wieku 8–9 lat, aż do osiągnięcia dojrzałości. Chłopcy służą jako paziowie lub giermkowie i często zaprzyjaźniają się z rodziną gospodarzy.",
      "Zakładnicy są podobni do wychowanków, lecz w rzeczywistości gwarantują umowy polityczne. Mogą być dobrze traktowani, ale prawdziwy charakter ich pobytu nigdy nie zostaje zapomniany."
    ]}
  ];

  /* ---------- 3. Religia ---------- */
  const RELIGION = [
    { t: "Wiara i przesądy", p: [
      "Większość mieszkańców Westeros wierzy w jakichś bogów, choć istnieje wiele uznanych religii. Wiara i przesądy wpływają na życie lordów i pospólstwa oraz na ich zwyczaje i tradycje.",
      "Dzieciom opowiada się bajki o snarkach i grumkinach oraz straszniejszych potworach, takich jak Inni, którzy zabiorą je, jeśli będą niegrzeczne. Większość z tych opowieści wyrasta, lecz niedawno nad światem latały smoki — kto wie, co kryje dzika głusza?"
    ]},
    { t: "Siedmiu (Wiara Siedmiu)", p: [
      "Najbardziej rozpowszechniona religia — andalska wiara w Siedmiu. Zwani „nowymi bogami”, choć ich kult dotarł do Westeros <strong>sześć tysięcy lat temu</strong>. To siedem aspektów jednego stwórcy; pospólstwo uważa ich zwykle za niezależne bóstwa, a teologię zostawia septonom.",
      "Modli się zwykle do pierwszych sześciu aspektów; niewielu czci Nieznajomego, bo jako uosobienie śmierci budzi strach.",
      "<strong>Ojciec</strong> (Ojciec Na Górze) — mądrość osądu, sprawiedliwy sąd nad zmarłymi. Brodaty mężczyzna, czasem w koronie, często z wagą.",
      "<strong>Matka</strong> — patronka matek, dzieci i niewinnych; błogosławi ciężarnym i nienarodzonym. Uosobienie litości, przedstawiana z uśmiechem.",
      "<strong>Wojownik</strong> — z mieczem; bóstwo rycerzy i żołnierzy, prowadzi broń i wzmacnia tarcze.",
      "<strong>Kowal</strong> — zwykle z młotem; tworzenie i leczenie, obrońca kalekich. Prosi się go o naprawę zniszczonego, ochronę statków przed sztormem, wzmocnienie broni i zbroi.",
      "<strong>Starucha</strong> — z latarnią; bogini mądrości i twarz przeznaczenia. Według wiernych sprowadziła na świat pierwszego kruka, gdy spojrzała za drzwi śmierci.",
      "<strong>Dziewica</strong> — patronka dziewcząt, młodych kobiet i kochanków; bogini niewinności i cnoty.",
      "<strong>Nieznajomy</strong> — oblicze śmierci; jednocześnie mężczyzna i kobieta lub żadne z nich, czasem przypomina zwierzę. Przeprowadza zmarłych do kolejnego świata i sądzi, czyją duszę nagrodzić, a czyją ukarać w siedmiu piekłach."
    ]},
    { t: "Duchowieństwo i organizacja Wiary", p: [
      "Poświęceni Wierze to <strong>słudzy boży</strong>: septoni i septy. Wypowiadając śluby, zrzekają się nazwisk rodowych — w oczach bogów wszyscy są równi. Septy są w Wierze równe septonom.",
      "Wierze przewodzi <strong>Wielki Septon</strong>, siedzący w Wielkim Septcie Baelora w Królewskiej Przystani. Obejmując urząd, zrzeka się także imienia, więc czasem mówi się o nich „ten gruby” i „ten przed grubym”.",
      "Następni w hierarchii są <strong>Najwierniejsi</strong>, mający duży wpływ na religię i politykę. Septoni i septy są piśmienni i wykształceni, często uczą dzieci szlachty.",
      "Niektóre zakony poświęcają się jednemu aspektowi (np. Kowalowi lub Wojownikowi).",
      "<strong>Bracia Ubodzy</strong> — w szorstkich brązowych habitach, żebrzą i zanoszą Wiarę do najmniejszych wsi; rzadko wykształceni, znają modlitwy na pamięć.",
      "<strong>Milczące Siostry</strong> — w szarościach, ze ślubem milczenia, służą Nieznajomemu; zakrywają twarze (poza oczami), bo patrzenie na twarze zmarłych przynosi nieszczęście. Przygotowują zmarłych do pochówku.",
      "Modli się w <strong>septach</strong> i <strong>septriach</strong> (klasztorach) o siedmiu ścianach, ozdobionych pryzmatami lub siedmioramiennymi gwiazdami. Święta księga to <strong>Siedmioramienna Gwiazda</strong>; zaprzysiężeni często noszą kryształowy pryzmat.",
      "Przed Podbojem Aegona Wiara miała znacznie większą władzę. Targaryenowie ją osłabili, lecz nadal ma duże wpływy. Nie stanowi prawa, ale silnie kształtuje moralność.",
      "W oczach Siedmiu przeklęci są ci, którzy łamią prawo gościnności, zabijają członków rodziny lub dopuszczają się kazirodztwa. Targaryenowie uważali, że stoją ponad bogami, i nie zważali na te zakazy."
    ]},
    { t: "Dawni bogowie", p: [
      "Pierwotnie bogowie Dzieci Lasu; Pierwsi Ludzie przejęli ich kult, gdy zapanował pokój. To bóstwa lasów, rzek i kamieni, reprezentowane przez <strong>czardrzewa</strong> o korze białej jak kość i liściach przypominających skrwawione dłonie.",
      "Drzewo z wyrzeźbioną twarzą to <strong>drzewo-serce</strong>; jego żywica jest czerwona i zabarwia twarz na karmazynowo.",
      "Przed pokojem Pierwsi Ludzie bali się twarzy w czardrzewach i ścinali je, wierząc, że zieloni prorocy Dzieci Lasu przez nie ich obserwują. Andalowie ścinali lub palili wszystkie czardrzewa, jakie napotkali.",
      "Dziś dawni bogowie są czczeni na Północy i w kilku odosobnionych miejscach o silnej krwi Pierwszych Ludzi. Czardrzewa rosną wyłącznie na Północy, gdzie każdy zamek ma własny <strong>boży gaj</strong> z drzewem-sercem.",
      "Na południu boże gaje bywają utrzymywane, lecz niewielu lordów w nich się modli; ich drzewa-serca to pospolite gatunki, bez rzeźbionych twarzy.",
      "Wyznawcy dawnych bogów wypowiadają wszystkie przysięgi — modlitwy, zaprzysiężenia i śluby — przed starożytnym drzewem-sercem."
    ]},
    { t: "Inne religie", p: [
      "<strong>Utopiony Bóg</strong> — czczony na Żelaznych Wyspach; bóg wód i łupieżców, mieszka w zalanych komnatach, a wyznawcy podążają jego Dawną Drogą. Żelaźni ludzie wierzą też w <strong>Boga Sztormów</strong>, starożytnego wroga Utopionego Boga.",
      "<strong>Matka Rhoyne i bogowie Rhoynarów</strong> — gdy Rhoynarowie przybyli do Dorne, niektórzy pozostali wierni dawnej religii. Sieroty Zielonej Krwi pływają po rzece na kolorowych barkach i modlą się do Matki Rhoyne oraz pomniejszych bogów, m.in. Starca z Rzeki, przedstawianego jako olbrzymi żółw.",
      "<strong>R’hllor, Pan Światła</strong> — słabo rozpowszechniony w Westeros, lecz jedna z najważniejszych religii na wschodzie. Wyznawcy noszą czerwień i czczą ogień i światło, wzywając je do obrony przed nocą pełną strachów."
    ]}
  ];
  document.getElementById("laws-list").innerHTML = acc(LAWS);
  document.getElementById("religion-list").innerHTML = acc(RELIGION);

  /* ---------- 4. Schemat tworzenia postaci ---------- */
  const STEPS = [
    { t: "Krok 2: Koncepcja bohatera", p: [
      "<strong>Wiek</strong> (wybierz lub wylosuj): dziecko, nastolatek, młodzieniec, dorosły, w średnim wieku, stary, bardzo stary, sędziwy.",
      "<strong>Status</strong> (wybierz lub wylosuj): dowolny od 1 do 6.",
      "<strong>Rola:</strong> intrygant, łotr, przywódca, specjalista, wojownik.",
      "<strong>Przeszłość:</strong> wymyśl przynajmniej jedno wydarzenie z przeszłości, które wpłynęło na życie bohatera.",
      "<strong>Cel:</strong> co bohater chce osiągnąć?",
      "<strong>Motywacja:</strong> dlaczego chce to osiągnąć?",
      "<strong>Cnota:</strong> wymień przynajmniej jedną godną uznania cechę.",
      "<strong>Słabość:</strong> wymień przynajmniej jedną negatywną cechę charakteru."
    ]},
    { t: "Krok 3: Przydzielenie zdolności", p: [
      "Określ początkowe punkty doświadczenia na podstawie wieku.",
      "W pierwszej kolejności wykup Status.",
      "Wydaj wszystkie pozostałe punkty doświadczenia na zdolności."
    ]},
    { t: "Krok 4: Przydzielenie specjalizacji", p: [
      "Określ początkowe punkty doświadczenia na podstawie wieku.",
      "Wydaj wszystkie punkty doświadczenia na specjalizacje."
    ]},
    { t: "Krok 5: Punkty losu i korzyści", p: [
      "Określ początkowe punkty losu na podstawie wieku.",
      "Wydaj punkty losu na korzyści — ich maksymalną liczbę określa wiek."
    ]},
    { t: "Krok 6: Przeciwności", p: [
      "Określ wymagane przeciwności na podstawie wieku.",
      "Wybierz przeciwności, które najbardziej pasują do koncepcji bohatera i jego słabości."
    ]},
    { t: "Krok 8: Statystyki pochodne", p: [
      "<strong>Obrona w intrydze</strong> = Spostrzegawczość + Spryt + Status",
      "<strong>Punkty opanowania</strong> = 3 × Wola",
      "<strong>Obrona w walce</strong> = Kondycja + Spostrzegawczość + Zręczność",
      "<strong>Punkty życia</strong> = 3 × Żywotność",
      "<strong>Punkty pancerza (PP):</strong> sprawdź wartość PP zbroi (Tabela 9-2: Pancerz, s. 155) i zapisz na karcie.",
      "<strong>Obrażenia broni:</strong> wypełnij statystyki broni zgodnie z Tabelą 9-3: Broń (s. 155–157)."
    ]},
    { t: "Krok 9: Rozpocznijcie grę!", p: [
      "Wypełnij pozostałe rubryki karty postaci (imię, pochodzenie, nazwisko rodowe itd.).",
      "Zapisz swe imię na kartach historii!"
    ]}
  ];
  const CALC = ["Spostrzegawczość", "Spryt", "Status", "Wola", "Kondycja", "Zręczność", "Żywotność"];
  const box = document.createElement("div");
  box.id = "creator-steps";
  box.className = "space-y-4";
  box.innerHTML = `
    <div class="ornate-divider"><h2 class="font-display text-lg font-bold tracking-[0.18em] text-amber-200 sm:text-xl">PEŁNY SCHEMAT TWORZENIA BOHATERA</h2></div>
    <div>${acc(STEPS)}</div>
    <div class="parchment-card rounded-lg p-5 sm:p-6">
      <h3 class="mb-3 font-display text-lg font-bold text-stone-900">Kalkulator statystyk pochodnych (Krok 8)</h3>
      <div class="grid grid-cols-2 gap-3 sm:grid-cols-4">
        ${CALC.map((n, i) => `<label class="font-display text-xs font-bold text-red-950">${n}
          <input id="cd-${i}" type="number" min="0" value="0" oninput="calcDerived()"
            class="mt-1 w-full rounded border border-amber-900/35 bg-white/80 px-2 py-1.5 font-body text-base text-stone-950 focus:border-red-900 focus:outline-none" /></label>`).join("")}
      </div>
      <div id="cd-out" class="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4"></div>
    </div>`;
  document.getElementById("characters-grid").parentElement.before(box);

  window.calcDerived = function () {
    const v = (i) => Number(document.getElementById("cd-" + i).value) || 0;
    const out = [
      ["Obrona w intrydze", v(0) + v(1) + v(2)],
      ["Punkty opanowania", 3 * v(3)],
      ["Obrona w walce", v(4) + v(0) + v(5)],
      ["Punkty życia", 3 * v(6)]
    ];
    document.getElementById("cd-out").innerHTML = out.map(([n, x]) => `
      <div class="rounded border border-amber-900/25 bg-amber-50/60 p-3 text-center">
        <div class="font-display text-[11px] font-bold tracking-wider text-stone-700">${n}</div>
        <div class="font-display text-2xl font-bold text-stone-950">${x}</div>
      </div>`).join("");
  };
  calcDerived();

  /* ---------- 5. Usunięcie Wieży Kości i poprawki tekstów ---------- */
  document.querySelector("#tab-rules aside")?.remove();
  const col = document.querySelector("#tab-rules .lg\\:col-span-8");
  if (col) { col.classList.remove("lg:col-span-8"); col.style.gridColumn = "1 / -1"; }

  document.querySelectorAll("article h3").forEach((h) => {
    if (h.textContent.includes("Wieża Kości pod ręką")) {
      const a = h.closest("article");
      h.textContent = "Zwyczaje i Religia pod ręką";
      a.querySelector("p").textContent = "W zakładkach Zwyczaje i Prawa oraz Religia znajdziesz szybkie ściągi: prawo gościnności, dziedziczenie, Siedmiu i dawnych bogów. Każda ma wyszukiwarkę.";
      const sp = a.querySelectorAll("span");
      if (sp[1]) sp[1].textContent = "ŚCIĄGA";
    }
  });
  const FIX = [
    ["KSIĘGA VI • MECHANIKA I KOŚCI", "KSIĘGA VI • MECHANIKA"],
    ["Reguły testów umiejętności, stopni trudności, walki, ran, pancerza oraz intryg dworskich wraz z interaktywnym symulatorem rzutów kośćmi.", "Reguły testów umiejętności, stopni trudności, walki, ran, pancerza oraz intryg dworskich."],
    ["Zasady Gry i Wieża Kości", "Zasady Gry"],
    ["OTWÓRZ ZASADY I RZUTNIK", "OTWÓRZ ZASADY"],
    ["ZASADY I KOŚCI", "ZASADY GRY"],
    ["zakładkę mapy oraz księgę zasad wraz z wieżą kości.", "zakładkę mapy, zwyczaje i prawa, religię oraz księgę zasad."],
    [" oraz interaktywna Wieża Kości.", "."]
  ];
  const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  while (tw.nextNode()) {
    const n = tw.currentNode;
    FIX.forEach(([a, b]) => { if (n.nodeValue.includes(a)) n.nodeValue = n.nodeValue.replace(a, b); });
  }

  /* ---------- 6. Zoom mapy (kółko, przeciąganie, szczypanie, dwuklik) ---------- */
  const ov = document.createElement("div");
  ov.style.cssText = "position:fixed;inset:0;z-index:100;background:rgba(0,0,0,.93);display:none;touch-action:none;overflow:hidden";
  const bs = "width:44px;height:44px;border-radius:6px;border:1px solid rgba(212,166,86,.6);background:#1d1714;color:#f6dfad;font-size:22px;cursor:pointer";
  ov.innerHTML = `
    <img id="mv-img" alt="Mapa Westeros" draggable="false" style="position:absolute;left:0;top:0;transform-origin:0 0;max-width:none;user-select:none;cursor:grab">
    <div style="position:absolute;top:12px;right:12px;display:flex;gap:8px;z-index:2">
      <button type="button" data-act="in" style="${bs}" aria-label="Przybliż">+</button>
      <button type="button" data-act="out" style="${bs}" aria-label="Oddal">−</button>
      <button type="button" data-act="reset" style="${bs}" aria-label="Dopasuj">⟲</button>
      <button type="button" data-act="close" style="${bs}" aria-label="Zamknij">✕</button>
    </div>
    <div style="position:absolute;bottom:10px;left:0;right:0;text-align:center;color:#a8a29e;font:14px Georgia,serif;pointer-events:none">
      Kółko myszy lub szczypnięcie — zoom • przeciągnij — przesuń • dwuklik — przybliż • Esc — zamknij
    </div>`;
  document.body.appendChild(ov);
  const img = ov.querySelector("#mv-img");
  const P = new Map();
  let s = 1, x = 0, y = 0, fit = 1;
  const apply = () => { img.style.transform = `translate(${x}px,${y}px) scale(${s})`; };
  const reset = () => {
    const w = img.naturalWidth || 1, h = img.naturalHeight || 1;
    fit = Math.min(innerWidth / w, innerHeight / h) * 0.95;
    s = fit; x = (innerWidth - w * s) / 2; y = (innerHeight - h * s) / 2; apply();
  };
  const zoomAt = (f, cx, cy) => {
    const ns = Math.min(Math.max(s * f, fit * 0.8), fit * 12);
    f = ns / s; x = cx - (cx - x) * f; y = cy - (cy - y) * f; s = ns; apply();
  };
  const open = (src) => {
    ov.style.display = "block";
    document.body.style.overflow = "hidden";
    if (img.getAttribute("src") !== src) img.src = src; else reset();
  };
  const close = () => { ov.style.display = "none"; document.body.style.overflow = ""; };
  img.onload = reset;

  ov.addEventListener("wheel", (e) => { e.preventDefault(); zoomAt(e.deltaY < 0 ? 1.2 : 1 / 1.2, e.clientX, e.clientY); }, { passive: false });
  ov.addEventListener("pointerdown", (e) => {
    if (e.target.closest("button")) return;
    ov.setPointerCapture(e.pointerId);
    P.set(e.pointerId, [e.clientX, e.clientY]);
  });
  ov.addEventListener("pointermove", (e) => {
    const o = P.get(e.pointerId);
    if (!o) return;
    if (P.size === 1) {
      x += e.clientX - o[0]; y += e.clientY - o[1];
      P.set(e.pointerId, [e.clientX, e.clientY]); apply();
    } else {
      const other = P.get([...P.keys()].find((k) => k !== e.pointerId));
      const d0 = Math.hypot(o[0] - other[0], o[1] - other[1]);
      P.set(e.pointerId, [e.clientX, e.clientY]);
      const d1 = Math.hypot(e.clientX - other[0], e.clientY - other[1]);
      if (d0 > 0) zoomAt(d1 / d0, (e.clientX + other[0]) / 2, (e.clientY + other[1]) / 2);
    }
  });
  const up = (e) => P.delete(e.pointerId);
  ov.addEventListener("pointerup", up);
  ov.addEventListener("pointercancel", up);
  ov.addEventListener("dblclick", (e) => { if (s > fit * 1.5) reset(); else zoomAt(3, e.clientX, e.clientY); });
  ov.addEventListener("click", (e) => {
    const a = e.target.closest("button")?.dataset.act;
    if (a === "in") zoomAt(1.5, innerWidth / 2, innerHeight / 2);
    if (a === "out") zoomAt(1 / 1.5, innerWidth / 2, innerHeight / 2);
    if (a === "reset") reset();
    if (a === "close") close();
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && ov.style.display === "block") close(); });
  window.addEventListener("resize", () => { if (ov.style.display === "block") reset(); });

  document.querySelectorAll('img[alt="Połączona mapa Westeros"]').forEach((im) => {
    im.style.cursor = "zoom-in";
    im.title = "Kliknij, aby powiększyć";
    im.addEventListener("click", () => open(im.getAttribute("src")));
  });
})();
