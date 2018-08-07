import PropTypes from 'prop-types';
import {
  FiltersClose, FiltersContactItem, FiltersContacts, FiltersList, FiltersListItem,
  FiltersListItemCount, FiltersListItemWrap, FiltersSection,
  FiltersSectionHeader, FiltersWrap,
} from './Filters.styled';
import { User } from '../User/User';

export const Filters = ({
  filters, sectionsTitles, onClose, onSelect,
}) => (
  <FiltersWrap>
    <FiltersClose onClick={onClose} />
    {Object.keys(filters).map((key, index) => (
      <FiltersSection key={key}>
        <FiltersSectionHeader>{sectionsTitles[key] || key}</FiltersSectionHeader>
        {
          key === 'contacts'
          ? <FiltersContacts>
              {filters[key].map(item =>
                <FiltersContactItem
                  active={item.active}
                  key={item.id}
                  onClick={() => onSelect({ category: key, id: item.id })}>
                  <User img={item.url} name={item.name}/>
                </FiltersContactItem>)}
            </FiltersContacts>
          : <FiltersList flexWrap={!index}>
            {filters[key].map(item => (
              <FiltersListItem
                key={item.id}
                onClick={() => onSelect({ category: key, id: item.id })}>
                 <FiltersListItemWrap active={item.active}>
                   {item.title}
                   <FiltersListItemCount>{item.count}</FiltersListItemCount>
                 </FiltersListItemWrap>
              </FiltersListItem>
            ))}
          </FiltersList>
        }
      </FiltersSection>
    ))}
  </FiltersWrap>
);

Filters.propTypes = {
  filters: PropTypes.object,
  onClose: PropTypes.func,
};
