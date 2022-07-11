import ProductCard from '../product-card/product-card.component'
import { CategoryPreviewContainer, PreviewContainer, Title } from './category-preview.styles.jsx'

const CategoryPreview = ({title, products}) => {
    return (
        <CategoryPreviewContainer>
            <h2>
                <Title to={`/shop/${title}`}>{title}</Title>
            </h2>
            <PreviewContainer>
                {
                    products.filter((_, idx) => idx < 4)
                    .map(product => (
                        <ProductCard key={product.id} product={product}/>
                    ))
                }
            </PreviewContainer>
        </CategoryPreviewContainer>
    )
};

export default CategoryPreview