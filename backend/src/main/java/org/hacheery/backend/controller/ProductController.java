package org.hacheery.backend.controller;

import lombok.RequiredArgsConstructor;
import org.hacheery.backend.entity.Product;
import org.hacheery.backend.payload.request.ProductRequest;
import org.hacheery.backend.service.impl.ProductServiceImpl;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/products")
@RequiredArgsConstructor
public class ProductController {
    private final ProductServiceImpl productService;

    @GetMapping
    public ResponseEntity<Page<Product>> getAllProducts(@ModelAttribute ProductRequest request,
                                                        @RequestParam(defaultValue = "0") int pageNumber,
                                                        @RequestParam(defaultValue = "10") int pageSize) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        Page<Product> productList = productService.getProducts(request, pageable);
        return new ResponseEntity<>(productList, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Product> addProduct(@RequestBody Product product) {
        Product savedProduct = productService.addProduct(product);
        return new ResponseEntity<>(savedProduct, HttpStatus.CREATED);
    }

    @GetMapping("{productId}")
    public ResponseEntity<Product> getProductByID(@PathVariable("productId") Long productId) {
        return new ResponseEntity<>(productService.getProductById(productId), HttpStatus.OK);
    }

    @PutMapping("{productId}")
    public ResponseEntity<Product> updateProduct(@PathVariable("productId") Long productId, @RequestBody Product product) {
        //user.setId(userId);
        Product updatedProduct = productService.updateProduct(productId, product);
        return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
    }

    @DeleteMapping("{productId}")
    public ResponseEntity<String> deleteProduct(@PathVariable("productId") Long productId) {
        productService.deleteProduct(productId);
        return new ResponseEntity<>("Delete product successfully", HttpStatus.OK);
    }
}
