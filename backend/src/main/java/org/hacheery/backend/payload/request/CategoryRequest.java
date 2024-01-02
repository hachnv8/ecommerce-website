package org.hacheery.backend.payload.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

/**
 * Created by HachNV on 10/07/2023
 */
@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryRequest extends PaginationRequest {
    private String categoryName;
    private Long parentId;
}
