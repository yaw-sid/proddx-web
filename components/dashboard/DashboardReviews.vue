<template>
  <div v-if="loading"></div>
  <section v-else>
    <!-- Modal Window -->
    <modal-window :show="showReviewDetails" @close="closeReviewDetails">
      <div class="m-content">
        <div class="heading">
          <h2>{{ currentReview.id }}</h2>
          <div class="rating">
            <span v-for="n in currentReview.rating" :key="n" class="material-icons">star</span>
          </div>
        </div>
        <h3>Comment</h3>
        <p>{{ currentReview.comment }}</p>
        <div class="actions">
          <app-button :loading="deleting" color="danger" @click.native="deleteReview()">Delete</app-button>
        </div>
      </div>
    </modal-window>

    <!-- Main Window -->
    <p class="mb-4">{{ filteredReviews.length }} reviews found</p>

    <div class="filter">
      <div>
        <select-field v-model="product" placeholder="Select a product" :options="productOptions" />
        <select-field v-model="sortCriterion" placeholder="Sort by" :options="sortCriteria" />
      </div>
      <div>
        <text-field v-model="fromDate" type="date" />
        <p>to</p>
        <text-field v-model="toDate" type="date" />
      </div>
    </div>

    <table>
      <colgroup>
        <col class="ten">
        <col class="fifty">
        <col class="twenty">
        <col class="twenty">
      </colgroup>
      <thead>
        <tr>
          <th>ID</th>
          <th>Comment</th>
          <th>Rating</th>
          <th>Date Added</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="review in paginatedReviews" :key="review.id" @click="displayReviewDetails(review)">
          <td>{{ review.id }}</td>
          <td>{{ review.comment }}</td>
          <td>
            <span v-for="n in review.rating" :key="n" class="material-icons">star</span>
          </td>
          <td>{{ review.date_created.toLocaleString().substring(0, 10) }}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="4">
            <div class="pagination">
              <div class="flex items-center gap-4">
                <p>Showing {{ pageStart }} - {{ pageEnd }} of {{ filteredReviews.length }}</p>
                <div class="actions">
                  <app-button 
                    color="primary" 
                    type="text" 
                    class="left-btn" 
                    :disabled="currentPage == 1" 
                    @click.native="prev()"
                  >&lsaquo;</app-button>
                  <app-button 
                    color="primary" 
                    type="text" 
                    class="right-btn" 
                    :disabled="!(currentPage * pageSize < filteredReviews.length)" 
                    @click.native="next()"
                  >&rsaquo;</app-button> 
                </div>
              </div>
            </div>
          </td>
        </tr>
      </tfoot>
    </table>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import AppButton from "@/components/forms/AppButton.vue";
import ModalWindow from "@/components/others/ModalWindow.vue";
import SelectField from "@/components/forms/SelectField.vue";
import TextField from "@/components/forms/TextField.vue";
import { Product } from '~/models/product';
import { Review } from '~/models/review';

export default Vue.extend({
  components: {
    AppButton,
    ModalWindow,
    SelectField,
    TextField
  },

  data: () => ({
    loading: true,

    showReviewDetails: false,
    currentReview: new Review("", 0, "", "", "", 0, new Date()),
    defaultReview: new Review("", 0, "", "", "", 0, new Date()),
    deleting: false,

    product: "",
    sortCriterion: "",
    sortCriteria: [
      {
        text: "Rating",
        value: "rating"
      }, {
        text: "Relevance",
        value: "relevance"
      }, {
        text: "Recent",
        value: "recent"
      }
    ],
    fromDate: "",
    toDate: "",

    currentPage: 1,
    pageSize: 5
  }),

  computed: {
    products(): Product[] {
      return this.$store.getters["products/getProducts"]
        .filter((p: Product) => p.company === "1");
    },

    reviews(): Review[] {
      return this.$store.getters["reviews/getReviews"]
        .filter((r: Review) => r.company === "1");
    },

    filteredReviews(): Review[] {
      return this.filterByProduct(this.filterFromDate(this.filterToDate(this.reviews)))
        .sort((a, b) => {
          if (this.sortCriterion === "rating") {
            return b.rating - a.rating;
          } else if (this.sortCriterion === "relevance") {
            return b.relevance - a.relevance;
          } else if (this.sortCriterion === "recent") {
            return b.date_created.getTime() - a.date_created.getTime();
          }
          return -1;
        });
    },

    paginatedReviews(): Review[] {
      return this.filteredReviews.filter((_p, index) => {
        const start = (this.currentPage - 1) * this.pageSize;
        const end = this.currentPage * this.pageSize;
        return index >= start && index < end; 
      });
    },

    pageStart(): number {
      return ((this.currentPage - 1) * this.pageSize) + 1;
    },

    pageEnd(): number {
      return (this.currentPage * this.pageSize) < this.filteredReviews.length ? this.currentPage * this.pageSize : this.filteredReviews.length;
    },

    productOptions(): { text: string, value: string}[] {
      return this.products.map((p) => {
        return {
          text: p.name,
          value: p.id
        }
      });
    }
  },

  async mounted() {
    const promises = [];
    if (!this.products.length) {
      promises.push(this.$store.dispatch("products/loadProducts", "1"))
    }
    if (!this.reviews.length) {
      promises.push(this.$store.dispatch("reviews/loadReviews", "1"))
    }

    try {
      await Promise.all(promises);
    } catch (error) {
      this.$toast.error("Failed to load data!");
    } finally {
      this.loading = false;
    }
  },

  methods: {
    filterByProduct(reviews: Review[]) {
      if (this.product) {
        return reviews.filter((r) => r.product === this.product);
      }
      return reviews;
    },

    filterFromDate(reviews: Review[]) {
      if (this.fromDate) {
        return reviews.filter((r) => r.date_created.getTime() >= new Date(this.fromDate).getTime());
      }
      return reviews;
    },

    filterToDate(reviews: Review[]) {
      if (this.toDate) {
        return reviews.filter((r) => r.date_created.getTime() <= new Date(this.toDate).getTime());
      }
      return reviews;
    },

    prev() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },

    next() {
      if ((this.currentPage * this.pageSize) < this.filteredReviews.length) {
        this.currentPage++;
      }
    },

    displayReviewDetails(review: Review) {
      this.currentReview = Object.assign({}, review);
      this.showReviewDetails = true;
    },

    closeReviewDetails() {
      this.showReviewDetails = false;
      this.currentReview = Object.assign({}, this.defaultReview);
    },

    async deleteReview() {
      this.deleting = true;
      
      try {
        await this.$store.dispatch("reviews/removeReview", this.currentReview.id);
        this.$toast.success("Successful!");
        this.closeReviewDetails();
      } catch (error) {
        this.$toast.error("Failed to delete!");
      } finally {
        this.deleting = false;
      }
    }
  }
});
</script>

<style scoped>
.filter {
  @apply flex justify-between items-center mb-6;
}

.filter > div {
  @apply flex items-center gap-4;
}

table {
  @apply w-full;

  border-collapse: separate; 
  border-spacing: 0 10px; 
  margin-top: -10px;
  table-layout: fixed;
}

.ten {
  width: 10%;
}
.twenty {
  width: 20%;
}
.fifty {
  width: 50%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

th {
  @apply bg-gray-100;
}

tbody tr {
  @apply cursor-pointer;
}

tbody tr:hover td {
  @apply bg-gray-50;
}

tbody td {
  @apply border-t border-b border-gray-400 transition;
}

th, td {
  @apply px-6 py-4 text-left;
}

tbody td:first-child {
  @apply border-l;
}

tbody td:last-child {
  @apply border-r;
}

th:first-child, tbody td:first-child {
  border-radius: 8px 0 0 8px;
}

th:last-child, tbody td:last-child {
  border-radius: 0 8px 8px 0;
}

tbody td span {
  @apply text-green-600;
}

.pagination {
  @apply flex justify-end;
}

.actions {
  @apply flex gap-4 pb-2;
}

.left-btn, .right-btn {
  @apply text-4xl p-0;
}

/* 

  Modal Window

*/
.m-content {
  @apply bg-white p-8 rounded-lg w-1/3 2xl:w-1/4;
}

.heading {
  @apply flex justify-between gap-8 items-center mb-4;
}

.rating {
  @apply text-green-600;
}

.m-content h3, .m-content p {
  @apply mb-4;
}

.m-content h3 {
  @apply font-semibold;
}

.actions {
  @apply flex justify-end;
}
</style>