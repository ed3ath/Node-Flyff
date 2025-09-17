QUEST_HERORAN_TRN1 = {
	title = 'IDS_PROPQUEST_INC_000571',
	character = 'MaDa_Eliff',
	end_character = 'MaDa_Eliff',
	start_requirements = {
		min_level = 60,
		max_level = 60,
		job = { 'JOB_ACROBAT' },
		previous_quest = '',
	},
	rewards = {
		gold = {
			min = 500000,
			max = 550000,
		},
		exp = 0,
		items = {
			{ id = 'II_SYS_SYS_QUE_MASNOMINATE', quantity = 1, sex = 'Any' },
		},
	},
	end_conditions = {
		monsters = {
			{ id = 'MI_DRILLER2', quantity = 20 },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_000572',
			'IDS_PROPQUEST_INC_000573',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_000574',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_000575',
		},
		completed = {
			'IDS_PROPQUEST_INC_000576',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_000577',
		},
	}
}
