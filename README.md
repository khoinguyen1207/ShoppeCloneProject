# Dự án Shopee Clone

## Chức năng trong dự án

-   Authentication module: Quản lý bằng JWT (access token và refresh token tự động)

    -   Đăng ký
    -   Đăng nhập
    -   Đăng xuất

-   Trang danh sách sản phẩm:

    -   Có phân trang thông minh
    -   Sort (sắp xếp) theo từng thuộc tính sản phẩm
    -   filter nâng cao theo từng thuộc tính sản phẩm
    -   Tìm kiếm sản phẩm

-   Trang chi tiết sản phẩm:

    -   Hiển thị thông tin chi tiết
    -   Ảnh hiển thị theo slider + hover zoom effect
    -   Mô tả thì hiển thị rich text dạng WYSIWYG HTML và phòng chống tấn công XSS
    -   Chức năng mua ngay và thêm hàng vào giỏ

-   Giỏ hàng

    -   Quản lý đơn hàng: Thêm, sửa, xóa sản phẩm
    -   Mua hàng

-   Quản lý Profile khách hàng

    -   Update thông tin cá nhân
    -   Upload Avatar
    -   Đổi mật khẩu
    -   Xem tình trạng đơn hàng

## Công nghệ sử dụng

Trong project này mình sẽ sử dụng:

-   Build Tool: Vite
-   Linter: Prettier + ESLint + Editor Config
-   Thư viện SPA: ReactJs
-   Ngôn ngữ: Typescript
-   Thư viện CSS: Tailwindcss, Floating UI
-   Quản lý form + validate: React Hook Form + Yup
-   State Manager: React Query + Context API
-   Gọi API: Axios
-   Authentication: JWT (access token + refresh token tự động)
-   API: RestfulAPI
-   Unit Test: Vitest + React Testing Library + Mock Service Worker
-   Quản lý component: Storybook
-   SEO: React Helmet
-   Đa ngôn ngữ: I18Next
