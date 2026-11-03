// Presentación breve de la persona: una bio corta y sus intereses como etiquetas.
export default function SobreMi({ bio, intereses }) {
  return (
    <section className="bloque-chico sobre-mi" aria-labelledby="sobre">
      <h2 id="sobre">Sobre mí</h2>
      <p className="bio">{bio}</p>
      <h3 className="mini-titulo" id="intereses">Intereses</h3>
      <ul className="chips" aria-labelledby="intereses">
        {intereses.map((interes) => <li key={interes}>{interes}</li>)}
      </ul>
    </section>
  );
}
