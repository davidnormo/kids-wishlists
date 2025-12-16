import { PageParams } from "frwk";
import { getOwnedProducts, getUser } from "../../supabase";
import { TableFor } from "../../components/TableFor";
import { useLayoutEffect, useRef, useState } from "preact/hooks";

export const prefetch = async () =>
  Promise.all([getOwnedProducts(), getUser()]);

export default function WishlistsPage({
  prefetched,
  refetch,
}: PageParams<typeof prefetch>) {
  const [{ groupedByFor, error }, { user }] = prefetched || [{}, {}];

  const newPersonRef = useRef<HTMLInputElement>(null);
  const [newList, setNewList] = useState(false);
  const [newPerson, setNewPerson] = useState("");
  const [showNewTable, setShowNewTable] = useState(false);

  useLayoutEffect(() => {
    if (newList) {
      newPersonRef.current?.focus();
    }
  }, [newList]);

  if (!user) return null;

  return (
    <div>
      <h1>
        My Wishlists <button onClick={() => setNewList(true)}>+</button>
      </h1>
      <style>{`
      table { border-collapse: collapse; }
      thead tr { border-top: none; }
      tr { 
        border-top: 1px solid #ccc;
        }
      td { padding: var(--pad); }
      `}</style>
      {prefetched === null && "Loading..."}
      {error && `Error! ${error}`}
      {groupedByFor &&
        Object.keys(groupedByFor).map((person) => (
          <TableFor
            key={person}
            person={person}
            owner={groupedByFor[person][0].owner}
            products={groupedByFor[person]}
            onAdded={refetch}
          />
        ))}
      {newList && !showNewTable && (
        <>
          <h3>New Wishlist for...</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setShowNewTable(true);
            }}
          >
            <input
              ref={newPersonRef}
              placeholder="Person's name"
              value={newPerson}
              onInput={(e) => setNewPerson(e.currentTarget.value)}
            />
            <button>Add</button>
          </form>
        </>
      )}
      {newList && showNewTable && (
        <TableFor
          person={newPerson}
          owner={user.id}
          products={[]}
          onAdded={() => {
            refetch();
            setNewList(false);
            setNewPerson("");
            setShowNewTable(false);
          }}
        />
      )}
    </div>
  );
}
