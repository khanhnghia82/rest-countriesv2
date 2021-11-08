import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  createContext,
} from "react";
import { FaChevronDown } from "react-icons/fa";
import { useParams } from "react-router";
import styled from "styled-components";
import { ThemeContext } from "../ThemeContext/ThemeContext";
import Options from "./Options/Options";

export const FilterContext = createContext();

function Filter(props) {
  const themeContext = useContext(ThemeContext);
  const [isShowOptions, setIsShowOptions] = useState(false);
  const refSelect = useRef(null);
  const [valueOption, setValueOption] = useState("All");  
  const slug = useParams();  

  useEffect(() => {
    if (slug.regionName) {
      setValueOption(slug.regionName)
    }else setValueOption('All')
  },[slug.regionName])

  const handleOptions = (e) => {
    //(refSelect.current.contains(e.target))
    // == true if click in range refSelect
    // == false if click out range refSelect
    setIsShowOptions(refSelect.current.contains(e.target));
  };

  useEffect(() => {
    if (isShowOptions) {
      document.addEventListener("click", handleOptions);
      return () => {
        document.removeEventListener("click", handleOptions);
      };
    }
  }, [isShowOptions]);

  const getValueOption = useCallback((value) => {
    setValueOption(value);
  }, []);

  const valueFilterContext = { getValueOption, valueOption };

  return (
    <FilterContext.Provider value={valueFilterContext}>
      <FitlerPane>
        <span>Filter by regions:</span>
        <SelectPane>
          <Select
            className={themeContext.theme}
            onClick={handleOptions}
            ref={refSelect}
          >
            <h3>{valueOption}</h3>
            <FaChevronDown />
          </Select>
          <Options isShowOptions={isShowOptions} />
        </SelectPane>
      </FitlerPane>
    </FilterContext.Provider>
  );
}

export default React.memo(Filter);

const FitlerPane = styled.div`
  max-width: 160px;
  width: 100%;
  margin-top: 20px;
  margin-right: 12px;
  @media screen and (max-width: 600px) {
    margin-left: 0px;    
    max-width: 100%;    
  }
  span {
    font-size: 18px;
    font-weight: 600;
    text-shadow: var(--TextShadow);
  }
`;
const SelectPane = styled.div`
  width: 100%;
  margin-top: 8px;
  position: relative;
`;
const Select = styled.div`
  padding: 0 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 4px;
  height: 34px;
  user-select: none;
`;
