QUEST_HEROELE_TRN3 = {
	title = 'IDS_PROPQUEST_INC_001677',
	character = 'MaFl_Cuzrill',
	end_character = 'MaSa_Parine',
	start_requirements = {
		min_level = 60,
		max_level = 60,
		job = { 'JOB_MAGICIAN' },
		previous_quest = 'QUEST_HEROELE_TRN2',
	},
	rewards = {
		gold = 0,
		exp = 0,
		items = {
			{ id = 'II_SYS_SYS_QUE_SCRSTAMP', quantity = 1, sex = 'Any' },
		},
	},
	end_conditions = {
		items = {
			{ id = 'II_SYS_SYS_QUE_FEATHERMANA', quantity = 1, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_001678',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_001679',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_001680',
		},
		completed = {
			'IDS_PROPQUEST_INC_001681',
			'IDS_PROPQUEST_INC_001682',
			'IDS_PROPQUEST_INC_001683',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_001684',
		},
	}
}
