import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  styled
} from "@mui/material";
import { categories } from "../../constants/data";
import {Link, useSearchParams} from 'react-router-dom'

const StyledTable=styled(Table)`
    border: 1px solid rgba(224, 224, 224, 1);
`

const StyledButton =styled(Button)`
    margin: 20px;
    width: 85%;
    background-color: #6495ED;
    color: #FFF;

`

const StyleLink=styled(Link)`
  text-decoration:none;
  color: inherit;
`

const Categories = () => {

  const [searchParams]=useSearchParams();
  const category= searchParams.get('category');

  return (
    <>
      <Link to={`/create?categories=${category || ''}`}>
        <StyledButton variant='contained'>Create Blog</StyledButton>
      </Link>

      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell>
              <StyleLink to='/'>
                All categories
              </StyleLink>
              </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>
                <StyleLink to={`/?category=${category.type}`}>
                {category.type}
                </StyleLink>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
    </>
  );
};

export default Categories;
