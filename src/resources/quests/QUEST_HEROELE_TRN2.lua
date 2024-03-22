QUEST_HEROELE_TRN2 = {
	title = 'IDS_PROPQUEST_INC_001666',
	character = 'MaDa_Horison',
	end_character = 'MaFl_Cuzrill',
	start_requirements = {
		min_level = 60,
		max_level = 60,
		job = { 'JOB_MAGICIAN' },
		previous_quest = 'QUEST_HEROELE_TRN1',
	},
	rewards = {
		gold = 0,
		exp = 0,
	},
	end_conditions = {
		items = {
			{ id = 'II_SYS_SYS_QUE_FEATHERMANA', quantity = 1, sex = 'Any', remove = false },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_001667',
			'IDS_PROPQUEST_INC_001668',
			'IDS_PROPQUEST_INC_001669',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_001670',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_001671',
		},
		completed = {
			'IDS_PROPQUEST_INC_001672',
			'IDS_PROPQUEST_INC_001673',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_001674',
		},
	}
}
