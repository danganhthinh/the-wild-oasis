import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";
function CabinTable() {
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();
  if (isLoading) return <Spinner />;
  if (!cabins.length) return <Empty resource="cabins" />;
  // filter
  const FilterValue = searchParams.get("discount") || "all";
  let filteredCabins;
  filteredCabins =
    FilterValue === "all"
      ? cabins
      : FilterValue === "no-discount"
      ? cabins.filter((cabin) => cabin.discount === 0)
      : cabins.filter((cabin) => cabin.discount > 0);

  // sort
  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  const [field, order] = sortBy.split("-");
  const modifier = order === "asc" ? 1 : -1;
  const sortedCabins = filteredCabins.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => (
            <CabinRow cabin={cabin} key={cabin.id || cabin._id} />
          )}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
