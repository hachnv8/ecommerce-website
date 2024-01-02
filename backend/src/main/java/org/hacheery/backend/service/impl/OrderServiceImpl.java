package org.hacheery.backend.service.impl;

import lombok.RequiredArgsConstructor;
import org.hacheery.backend.entity.Order;
import org.hacheery.backend.exception.ResourceNotFoundException;
import org.hacheery.backend.payload.request.OrderRequest;
import org.hacheery.backend.repository.OrderRepository;
import org.hacheery.backend.service.OrderService;
import org.hacheery.backend.specification.OrderSpecification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;
    public Order createOrder(Order order) {
        return orderRepository.save(order);
    }

    public Page<Order> getOrders(OrderRequest orderRequest, Pageable pageable) {
        Specification<Order> spec = OrderSpecification.searchByParameter(
                orderRequest
        );
        return orderRepository.findAll(spec, pageable);
    }

    public Order getOrderById(Long orderId) {
        return orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order", "id", orderId));
    }

    public void deleteOrder(Long orderId) {
        orderRepository.deleteById(orderId);
    }
}
