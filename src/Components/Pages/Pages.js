import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Countries from '../Countries/Countries';
import Paginations from '../Paginations';
import SearchAndFilter from '../SearchAndFilter/SearchAndFilter';
import { LIMIT_COUNTRIES_VIEW } from '../Store/constants'

function Filter(props) {
  const totalCountries = useSelector((state) => state.Countries.totalCountries);   
  const [totalPages, setTotalPages] = useState(0);   
  const loading = useSelector((state) => state.Countries.loading);

  useEffect(() => {
    setTotalPages(Math.ceil(totalCountries/LIMIT_COUNTRIES_VIEW))
  },[totalCountries])

  return (
    <div>
      <SearchAndFilter />
      {!loading && <Paginations totalPages={totalPages}/>}
      <Countries />
    </div>
  );
}

export default React.memo(Filter);