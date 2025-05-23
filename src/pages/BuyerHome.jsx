import useParts from "../store/parts";
import useAuth from "../store/auth";

export default function BuyerHome() {
  const { parts } = useParts();
  const { role } = useAuth();

  return (
    <div>
      <h2>Repuestos Disponibles</h2>
      {parts.length === 0 ? (
        <p>No hay repuestos aún.</p>
      ) : (
        parts.map((part, idx) => (
          <div key={idx} style={{ border: "1px solid gray", margin: "1em", padding: "1em" }}>
            <h3>{part.name}</h3>
            <p>{part.description}</p>
            <p>💲{part.price}</p>
            {role !== "guest" ? (
              <>
                <button>Comprar</button>
                <p>Vendedor: {part.seller}</p>
              </>
            ) : (
              <>
                <button disabled>Login requerido para comprar</button>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}
