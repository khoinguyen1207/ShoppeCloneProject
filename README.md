# Dự án Shopee Clone

-   Link website: [Shopee Clone](https://shoppe-clone-project.vercel.app/)
-   Tài khoản test:
    -   Email: nguyen12@gmail.com
    -   Password: 1234567

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

## Hiệu suất trang web (Lighthouse)

-   Bằng cách tìm tòi và áp dụng các kiến thức đã học. Tôi đã tối ưu được hiệu xuất cho dự án của mình

    ![alt](https://lh3.googleusercontent.com/pw/AIL4fc_NNM0I91OPCbQ6m_Nq0U0MAqLSC6J7SuYNXpzZiRIpezQ6XrWOBRaIvtx67MfB29b9mj5eQ2X5Fh9Tia6Hhsmp9ZH93B4_8PKNJZQkfDtEa26UeP3k1eYBvWXiqSq6lSd5tuwkui2-Kqa6WJQQ4F6iY86C0HavOeDQNLPSZZGh1AfZw9Upg6AzIfzKdrIW6GUGpsUU0Tp-OIgqa_Ompn3ke6QeFKp-KaH1DKOl2noD6bkG_DNc4WnfGdeClxC6Bsk-YSzFdaZEd_X5_Rg3wkMRnCvY7sMoYDI8dDExl0rUsTFdWNszT0sXR-xgXosSS8jXKyEJBetYkoHehOn1n8Uqo09bU5aGVtN_EpLp3cVFdLxkDHymj1CFp2rGBhWCtjEDao_xZLhguSSBcY64Xbw1j-N0pYefyqpiDzd3wWRLUEwngsd4RVNmb4Zb9YGExmHWAq2a25ODF5QW79KrafyDQ42QvAa-u4JpJrg_yjp4OW1uLOlD-eTDtqNvKk5olPrd-8c0QJZJjN_-V_JLGfMwxFkn9wTIg-b1sfwKARM8wvTZLDJTL70cPFSpW8uUgykiT9rfPKDh8JWmShrZATVgCLvmHpFviQMIzckOYRlmKeAnldPXR9oJl-N_DpMPgsU_2v5ClB7pw2u3xn202nH16ZTwixdIkcwMfarhPGiPuFeBHN-QOGpr0Ydc7aWZ6BXO1X8xlc3-K3nT9-ia_cDq70aRUbB_sQvWGmJNSHn-q08UcInn2Eczmyfx5H_bN1CrVRo8e48zcI7_C0s5hxvo8xW-bKo00-Dj5Wc3iPGACX33II2fk9_rlPNWQeAB4Sh-OW1zT5Ix-hW4lIz6KLPvtRwDsxkJV6UweXDR-kHCTxPqqu7k6xtzzF_kvUDsQiCKmaL-rLnNEUF3fattaKxRfs12x4aWDMW85ENtiI9kzKgGYqvpHFQ0JWCMByI=w779-h579-s-no?authuser=0)
