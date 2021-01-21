import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import ProductModal from "../components/ProductModal";
import { fetchProductsAction, deleteProductAction } from "../redux/actions";
import { Button, Input } from "reactstrap";
import swal from "sweetalert";

function HomePage(props) {
	const [filter, setFilter] = useState(false);
	const [min_Price, setMin_Price] = useState(0);
	const [max_Price, setMax_Price] = useState(0);
	useEffect(() => {
		props.fetchProductsAction(filter);
	}, [filter]);

	const handleFilter = () => {
		setFilter(!filter);
	};
	const handleDelete = (id) => {
		swal({
			title: "Are you sure?",
			text:
				"Once deleted, you will not be able to recover this imaginary file!",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		}).then((willDelete) => {
			if (willDelete) {
				props.deleteProductAction(id);
				swal("Poof! Your imaginary file has been deleted!", {
					icon: "success",
				});
			} else {
				swal("Your imaginary file is safe!");
			}
		});
	};
	const handlePriceInputMin = (e) => {
		setMin_Price(e.target.value);
	};
	const handlePriceInputMax = (e) => {
		setMax_Price(e.target.value);
	};
	const handlePriceFilter = () => {
		return props.productList.filter((val) => {
			return val.price >= min_Price && val.price <= max_Price;
		});
	};
	console.log(min_Price, max_Price);
	const mapProducts = () => {
		return props.productList.map((val, i) => {
			return (
				<div
					className="product-card d-flex flex-row"
					style={{ width: "fit-content" }}
				>
					<div className="card m-2">
						<img src={val.image} alt="not found" width="200px" height="200px" />
						<h6>{val.name}</h6>
						<p>{val.price}</p>
						<div>
							<ProductModal
								nama={val.name}
								caption={val.caption}
								buttonLabel={val.name}
							/>
							<Button onClick={() => handleDelete(val.id)}>delete</Button>
						</div>
					</div>
				</div>
			);
		});
	};
	return (
		<div className="container d-flex">
			<div>
				<Button onClick={handleFilter}>
					{filter ? "Available" : "Unavailable"}
				</Button>
			</div>
			<div>
				<Input
					type="number"
					placeholder="MinimumPrice"
					onChange={handlePriceInputMin}
					id="min_price"
				/>
				<Input
					type="number"
					placeholder="MaximumPrice"
					onChange={handlePriceInputMax}
					id="max_price"
				/>
				<Button onClick={handlePriceFilter}>filter</Button>
			</div>
			<div className="d-flex">{mapProducts()}</div>
		</div>
	);
}
const mapStateToProps = ({ product }) => {
	return {
		productList: product.productList,
	};
};

export default connect(mapStateToProps, {
	fetchProductsAction,
	deleteProductAction,
})(HomePage);
