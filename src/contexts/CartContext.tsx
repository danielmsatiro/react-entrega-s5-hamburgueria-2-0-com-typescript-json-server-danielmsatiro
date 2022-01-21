import { AxiosResponse } from "axios";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { api } from "../services/api";

interface CartProviderProps {
  children: ReactNode;
}

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  img: string;
  quantity: number;
  userId: string;
}

interface CartContextData {
  cart: Product[];
  setCart: (cart: Product[]) => void;
  loadCart: (userId: string, accessToken: string) => Promise<void>;
  createProduct: (
    data: Omit<Product, "id">,
    accessToken: string
  ) => Promise<void>;
  addProduct: (
    quantity: number,
    productId: number,
    userId: string,
    accessToken: string
  ) => Promise<void>;
  subtractProduct: (
    quantity: number,
    productId: number,
    userId: string,
    accessToken: string
  ) => Promise<void>;
  removeProduct: (productId: number, accessToken: string) => Promise<void>;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within an ProductProvider");
  }
  return context;
};

const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<Product[]>([]);

  const loadCart = useCallback(async (userId: string, accessToken: string) => {
    try {
      const response = await api.get(`/cart?userId=${userId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setCart(response.data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const createProduct = useCallback(
    async (data: Omit<Product, "id">, accessToken: string) => {
      api
        .post("/cart", data, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response: AxiosResponse<Product>) => {
          setCart((oldCart) => [...oldCart, response.data]);
        })
        .catch((err) => console.log("Erro no createProduct", err));
    },
    []
  );

  const addProduct = useCallback(
    async (
      quantity: number,
      productId: number,
      userId: string,
      accessToken: string
    ) => {
      await api
        .patch(
          `/cart/${productId}`,
          { quantity: quantity + 1, userId },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((_) => {
          loadCart(userId, accessToken);
        })
        .catch((err) => console.log("Erro no addProduct", err));
    },
    [cart]
  );

  const subtractProduct = useCallback(
    async (
      quantity: number,
      productId: number,
      userId: string,
      accessToken: string
    ) => {
      await api
        .patch(
          `/cart/${productId}`,
          { quantity: quantity - 1, userId },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((_) => {
          loadCart(userId, accessToken);
        })
        .catch((err) => console.log("Erro no addProduct", err));
    },
    [cart]
  );

  const removeProduct = useCallback(
    async (productId: number, accessToken: string) => {
      await api
        .delete(`/cart/${productId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((_) => {
          const filteredCart = cart.filter(
            (product) => product.id !== productId
          );
          setCart(filteredCart);
        })
        .catch((err) => console.log(err));
    },
    [cart]
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        loadCart,
        createProduct,
        addProduct,
        subtractProduct,
        removeProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { useCart, CartProvider };
