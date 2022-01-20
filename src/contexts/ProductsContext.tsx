import { AxiosResponse } from "axios";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { api } from "../services/api";

interface ProductProviderProps {
  children: ReactNode;
}

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  img: string;
}

interface ProductContextData {
  products: Product[];
  loadProducts: () => Promise<void>;
  searchProduct: (nameOrCategory: string) => Promise<void>;
  notFound: boolean;
  productNotFound: string;
}

const ProductContext = createContext<ProductContextData>(
  {} as ProductContextData
);

const useProducts = () => {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error("useProducts must be used within an ProductProvider");
  }
  return context;
};

const ProductProvider = ({ children }: ProductProviderProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [notFound, setNotFound] = useState(false);
  const [productNotFound, setProductNotFound] = useState("");

  const loadProducts = useCallback(async () => {
    try {
      const response = await api.get(`/products`);

      setProducts(response.data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const searchProduct = useCallback(async (nameOrCategory: string) => {
    const responseName = await api.get(`/products?name_like=${nameOrCategory}`);

    if (!responseName.data.length) {
      setProductNotFound(nameOrCategory);
      setNotFound(true);
    } else {
      setNotFound(false);
      return setProducts(responseName.data);
    }

    const responseCategory = await api.get(
      `/products?category_like=${nameOrCategory}`
    );

    if (!!responseCategory.data.length) {
      setNotFound(false);
      setProducts(responseCategory.data);
    }
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        loadProducts,
        searchProduct,
        notFound,
        productNotFound,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export { useProducts, ProductProvider };
